import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    //请求成功拦截
    requestInterceptor: (config: any) => {
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    //请求失败的拦截
    requestInterceptorCatch: (err) => {
      return err
    },
    //响应成功的拦截
    responseInterceptor: (res) => {
      return res
    },
    //响应失败的拦截
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})
export default hyRequest
