import axios from "axios"
import {CustomHttpClient} from "./CommonAxios"

const axiosRequestFn = async config => await axios(config)

const customAxiosInstance = new CustomHttpClient(axiosRequestFn, 8)

export default customAxiosInstance
