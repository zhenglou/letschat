import axios, { AxiosRequestConfig } from 'axios'
import { userStorage } from './storage'
export type Result = {
  // success: boolean
  message: string
  code: number
  data: any,
  pagination?: Pagination;
  total:number
}
export interface Pagination {
  currentPage: number;
  pageSize: number;
  total: number;
}

const instance = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 自动加token
    try {
      const user = userStorage.get();
      if (user && user.token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${user.token}`;
      }
    } catch (e) {
      // 忽略token注入错误
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // console.log(response,111);
    
    return response.data
  },
  (error) => {
    // 这里可以统一处理错误
    if (error.response) {
      switch (error.response.status) {
        case 400:
          break
        case 401:
          // 未授权，可以跳转到登录页
          break
        case 403:
          // 权限不足
          break
        case 404:
          // 请求的资源不存在
          break
        case 500:
          // 服务器错误
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

// 泛型封装
function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  return instance(config) as Promise<T>;
}

export default request
