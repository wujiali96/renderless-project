class RequestQueue {
    constructor(maxRequest = 5)  {
        this.maxRequest = maxRequest
        this.queue = []
        this.processing = []
    }

    async executeRequest(request) {
        this.processing.push(request)

        try {
            let response
            if(request.fn && typeof(request.fn) == "function"){
                response = await request.fn()
            }
             
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

class CustomHttpClient{
    constructor(requestFn, maxRequest = 5){
        this.requestQueue = new RequestQueue(maxRequest)
        this.requestFn = requestFn
    }

    async request(config) {
        const request = {
            fn: async () => {
                const response = await this.requestFn(config)
                return response
            },
            maxRetry: 3,
            retryCount: 0
        }
        return await this.requestQueue.enqueue(request)
    }
}

export {
    RequestQueue,
    CustomHttpClient
}
