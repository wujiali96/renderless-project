
import CustomAxios from "./CustomAxios"

const customAxiosInstance = new CustomAxios('https://api.example.com', 5)
const axiosInstance = customAxiosInstance.getInstance()

export default axiosInstance