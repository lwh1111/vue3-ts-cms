// service的统一出口
import WhRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

// 如果有多个请求，每个请求对应的baseURL和拦截的东西可能不一样
// 每个请求对应不同的axios实例
const whRequest = new WhRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        config.headers!.Authorization = `Bearer ${token}`
      }

      return config
    },
    requestInterceptorCatch: (err) => {
      // 请求失败拦截
      return err
    },
    responseInterceptor: (res) => {
      // 响应成功拦截
      return res
    },
    responseInterceptorCatch: (err) => {
      // 响应失败拦截
      return err
    }
  }
})
// export const whRequest2 = new WhRequest({
//   baseURL: ''
// })

export default whRequest
