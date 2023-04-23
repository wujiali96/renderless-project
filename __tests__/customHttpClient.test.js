import {CustomHttpClient} from "src/api/common-axios/CommonAxios"
import axios from "axios"
import { Exception } from "sass"

const axiosRequestFn = async config => await axios(config)
const customAxiosInstance = new CustomHttpClient(axiosRequestFn, 8)

const fetchRequestFn = async config => await fetch(config.url, {
    method: config.method,
    headers: config.headers,
    body: config.body
})
const customFetchInstance = new CustomHttpClient(fetchRequestFn, 5)

describe('CustomHttpClient with axios', () => {
    test('should make a successful get request', async () => {
        const response = await customAxiosInstance.request({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/todos/1"
        })
    })

    expect(response.status).toBe(200)
    expect(response.data).toHaveProperty('id', 1)
})

describe('CustomHttpClient with fech', () => {
    test('should make a successful get request', async () => {
        const response = await customFetchInstance.request({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/todos/1"
        })
    })

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('id', 1)
})