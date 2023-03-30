import {CustomHttpClient} from "./CommonAxios"

const fetchRequestFn = async config => await fetch(config.url, {
    method: config.method,
    headers: config.headers,
    body: config.body
})

const customFetchInstance = new CustomHttpClient(fetchRequestFn, 5)

export default customFetchInstance