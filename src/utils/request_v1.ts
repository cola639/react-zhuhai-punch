import axios from 'axios'

const BASE_URLS: { [key: string]: string } = {
  default: process.env.REACT_APP_API_URL || '',
  tencent: process.env.REACT_APP_TENCENT_API_URL || ''
}
function createAxiosInstance(proxyName = 'default') {
  const service = axios.create({
    baseURL: BASE_URLS[proxyName],
    timeout: 15 * 1000
  })

  // request interceptor
  service.interceptors.request.use(
    config => {
      console.log('config', JSON.stringify(config))
      // do something before request is sent
      // if (token) {
      //   config.headers['Authorization'] = getToken();
      // }
      return config
    },
    error => {
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )

  // response interceptor
  service.interceptors.response.use(
    response => {
      console.log('🚀 >> response:', response)
      const res = response.data

      if (res.code !== 200) {
        // Handle custom errors here
        if (res.code === 401) {
          console.log('401')
          // Handle unauthorized response
        }
        if (res.code === 500) {
          console.log('500')
          // Handle server error
        }

        if (!res.code) {
          return response
        }

        return Promise.reject(new Error(res.msg || 'Error'))
      } else {
        return res
      }
    },
    error => {
      console.log('err' + error) // for debug
      return Promise.reject(error)
    }
  )

  return service
}

const defaultService = createAxiosInstance('default')

export default defaultService
