import axios from 'axios'
import type { AxiosInstance } from 'axios' // axios内部提供了对应的类型
import { WhInterceptors, WhRequestConfig } from './types'

import { ElLoading } from 'element-plus'
// import type { Partial } from 'element-plus/lib/'

const DEFAULT_LOADING = true // 常量一般用大写

// 使用类来封装，封装性更强
class WhRequest {
  instance: AxiosInstance
  interceptors?: WhInterceptors
  showLoading?: boolean
  loading?: any

  constructor(config: WhRequestConfig) {
    // create函数可以创建一个axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING // 如果config.showLoading是null或undefind，this.showLoading则为默认值

    // 使用拦截器
    // 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 所有的实例都有的拦截器，请求成功拦截
        // 所有的请求都加上loading样式
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据……',
            background: 'rgba(0, 0, 0, 0.4)'
          })
        }
        return config
      },
      (err) => {
        // 所有的实例都有的拦截器，请求失败拦截
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 所有的实例都有的拦截器，响应成功拦截

        // 响应成功，移除loading
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // 响应失败，移除loading
        this.loading?.close()

        // 例子：判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        // 所有的实例都有的拦截器，响应失败拦截
        return err
      }
    )
  }

  request<T = any>(config: WhRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 每个请求单独的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 处理单独请求的showLoading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1. 单个响应对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 2. 请求完成后showLoading改为默认值，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3. 将resolve结果返回出去
          resolve(res)
        })
        .catch((err) => {
          // 请求完成后showLoading改为默认值，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T = any>(config: WhRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: WhRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: WhRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: WhRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default WhRequest
