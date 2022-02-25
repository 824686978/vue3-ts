import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: HYRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config)

    //保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    //从config中取出的拦截器对应的实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //所有实例都有的拦截器
    this.instance.interceptors.request.use((config) => {
      console.log('所有的实例都有的拦截器：请求成功拦截')
      if (this.showLoading) {
        this.loading = ElLoading.service({
          lock: true,
          text: '正在请求数据。。。',
          background: 'rgba(0,0,0,0.5)'
        })
      }
      return config
    }),
      (err: any) => {
        console.log('所有的实例都有的拦截器：请求失败拦截')
        return err
      }
    this.instance.interceptors.response.use((res) => {
      console.log('所有的实例都有的拦截器：响应成功拦截')

      this.loading?.close()

      const data = res.data
      if (data.returnCode === '-1001') {
        console.log('请求失败')
      } else {
        return data
      }
    }),
      (err: any) => {
        console.log('所有的实例都有的拦截器：响应失败拦截')
        this.loading?.close()
        return err
      }
  }
  request<T>(config: HYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      //单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      //判断是否显示Loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        //单个请求对数据从处理
        .request(config)
        .then((res: any) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          //将showLoading设置成true，这样不影响下个请求
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          //将showLoading设置成true，这样不影响下个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  get<T>(config: HYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: HYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: HYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}
export default HYRequest
