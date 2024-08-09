import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

const http = axios.create({
  baseURL: BASE_URL
})


http.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    console.log(error)
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
  return Promise.reject(error)
  }
)

export default http
