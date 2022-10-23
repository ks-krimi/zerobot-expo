import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const headers = {}

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers,
  validateStatus: (status) => {
    return status >= 200 && status < 500
  }
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token')
    const parsedToken = JSON.parse(token)
    if (token) {
      // set token authorization in headers
      config.headers.Authorization = `${parsedToken.token_type} ${parsedToken.access_token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  async (response) => {
    if (response.status === 401) {
      // TODO: if UNAUTHORIZED
      await AsyncStorage.removeItem('token')
    }
    return new Promise((resolve, _) => {
      resolve(response)
    })
  },
  (error) => {
    return new Promise((_, reject) => {
      reject(error)
    })
  }
)

export default axiosInstance
