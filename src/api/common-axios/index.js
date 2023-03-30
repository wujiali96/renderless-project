import customAxiosInstance from "./customAxiosInstance"
import customFetchInstance from "./customFetchInstance"

const testCustomAxios = async () => {
    try{
        const response = await customAxiosInstance.request({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/todos/1"
        })
        console.log("axios response:", response.data);
    }catch(error) {
        console.error("axios error:", error)
    }
}

const testCustomFetch = async () => {
    try{
        const response = await customFetchInstance.request({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/todos/1"
        })
        const data = await response.json()
        console.log("fetch response:", data);
    }catch(error) {
        console.error("fetch error:", error)
    }
}

for(let i = 0; i< 10; i++) {
    testCustomAxios()
    testCustomFetch()
}