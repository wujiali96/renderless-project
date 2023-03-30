import {CustomHttpClient} from "../api/common-axios/CommonAxios"
import axios from "axios"
global.fetch = require('node-fetch');

const axiosRequestFn = async config => await axios(config)
const customAxiosInstance = new CustomHttpClient(axiosRequestFn, 8)

const fetchRequestFn = async config => await fetch(config.url, {
    method: config.method,
    headers: config.headers,
    body: config.body
})
const customFetchInstance = new CustomHttpClient(fetchRequestFn, 5)

describe('CustomHttpClient with axios', () => {
  test('should make a successfull GET request', async () => {
    const response = await customAxiosInstance.request({
        method: "get",
        url: "https://jsonplaceholder.typicode.com/todos/1"
    })

    expect(response.status).toBe(200)
    expect(response.data).toHaveProperty('id', 1)
  }, 10000)
})

describe('CustomHttpClient with fetch', () => {
    test('should make a successfull GET request', async () => {
        const response = await customFetchInstance.request({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/todos/1"
        })

        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data).toHaveProperty('id', 1)
    }, 10000)
  })