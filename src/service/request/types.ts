import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface WhInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T // 也可以先用any代替
  responseInterceptorCatch?: (error: any) => any
}

export interface WhRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: WhInterceptors<T>
  showLoading?: boolean
}
