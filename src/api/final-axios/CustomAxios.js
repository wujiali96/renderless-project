import axios from "axios"

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
               const request = async () => this.instance(config)
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