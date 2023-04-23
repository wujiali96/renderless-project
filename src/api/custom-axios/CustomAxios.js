// 自定义axios构造器作封装
class CustomAxios {
    constructor(baseURL, maxRequest = 5) {
        this.maxRequest = maxRequest
        this.requestQueue = []
        this.instance = axios.create({
            baseURL,
            timeout: 60000
        })
        this.setupInterceptors()
    }

    setupInterceptors() {
        this.instance.interceptors.request.use(
            async config => {
                if(this.requestQueue.length > this.maxRequest) {
                    await new Promise((resolve) => {
                        this.requestQueue.push(resolve)
                    })
                }
                return config
            },
            error => {
               return Promise.reject(error)
            }
        )

        this.instance.interceptors.response.use(
            response => {
                if(this.requestQueue.length > 0) {
                    this.requestQueue.shift()()
                }
                return response
            },
            error => {
                if(this.requestQueue.length > 0) {
                    this.requestQueue.shift()()
                }
                return Promise.reject(error)
            }
        )
    }

    getInstance() {
        return this.instance
    }
}