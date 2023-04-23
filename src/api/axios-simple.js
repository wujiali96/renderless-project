import axios from "axios";
import { resolve } from "core-js/fn/promise";

const instance = axios.create({
    baseURL: "",
    timeout: 60000
})

const maxRequest = 5
let requestQueue = []

// 请求拦截
instance.interceptors.request.use(
    async config => {
        if(requestQueue.length > maxRequest) {
            await new Promise((resolve) => {
                requestQueue.push(resolve)
            })
        }
        return config
    },
    error => {
       return Promise.reject(error)
    }
);

// 响应拦截
instance.interceptors.response.use(
    response => {
        if(requestQueue.length > 0) {
            requestQueue.shift()()
        }
        return response
    },
    error => {
        if(requestQueue.length > 0) {
            requestQueue.shift()()
        }
        return Promise.reject(error)
    }
)

export default instance
