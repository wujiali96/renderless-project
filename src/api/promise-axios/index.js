import axios from "axios";

const requestQueue = new RequestQueue
const baseURL = ''
const timeout = 60000

const customAxios = async (config) => {
    const request = () => axios({...config, baseURL, timeout})
    return requestQueue.enqueue(request)
}

export default customAxios
