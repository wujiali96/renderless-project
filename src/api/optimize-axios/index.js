import axios from "axios"

class RequestQueue {
    constructor(maxRequest = 5)  {
        this.maxRequest = maxRequest
        this.queue = []
        this.processing = []
    }

    async executeRequest(request) {
        this.processing.push(request)

        try {
            const response = await request.fn()
            this.processing.splice(this.processing.indexOf(request), 1)
    
            if(this.queue.length > 0 ) {
                const nextRequest = this.queue.shift() 
                this.executeRequest(nextRequest)
            }
    
            return response
        }catch(error) {
            if(request.retryCount < request.maxRetry) {
                request.retryCount++
                return this.enqueue(request)
            } else {
               throw error 
            }
        }
       
    }

    async enqueue(request) {
        if(this.processing.length < this.maxRequest) {
            return this.executeRequest(request)
        } else {
           return new Promise((resolve, reject) => {
              this.queue.push(async () => {
                  try {
                    const result = await this.executeRequest(request)
                    resolve(result)
                  } catch(error) {
                      reject(error)
                  }
              })
           })
        }
    }
}

class CustomAxios {
    constructor(baseURL, maxRequest = 5) {
        this.requestQueue = new RequestQueue(maxRequest)
        this.instance = axios.create({
            baseURL,
            timeout: 60000
        })
        this.setupInterceptors()
    }

    setupInterceptors() {
        this.instance.interceptors.request.use(
            async config => {
               const source = axios.CancelToken.source()
               config.cancelToken = source.token

               const request = {
                   fn: async () => {
                       const response = await this.instance(config)
                       return response
                   },
                   maxRetry: 3,
                   retryCount: 0,
                   cancle: () => source.cancel()
               }
               return await this.requestQueue.enqueue(request)
            },
            error => {
               return Promise.reject(error)
            }
        )
    }

    getInstance() {
        return this.instance
    }
}

const customAxiosInstance = new CustomAxios('https://api.example.com', 5)
const axiosInstance = customAxiosInstance.getInstance()

export default axiosInstance