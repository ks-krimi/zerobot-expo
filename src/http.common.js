import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import routes from './constants/routes'
import { navigate } from './navigations'

const headers = {}

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      console.log('access token: ', token)
      // TODO: set token authorization in header
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      resolve(response)
    })
  },
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }

    // unauthorized
    if (error.response.status === 403) {
      navigate(routes.WELCOME, { tokenInvalideOrExpired: true })
    } else {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }
  }
)

export default axiosInstance
