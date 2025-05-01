import axios from 'axios'
export type Result = {
  // success: boolean
  message: string
  code: number
  data: any,
  pagination?: Pagination;
}
export interface Pagination {
  currentPage: number;
  pageSize: number;
  total: number;
}

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
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

export default request
