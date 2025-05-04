import request, { Result } from "@/utils/request";
const baseURL = "/users"
// 基础的 GET 请求
export function getUserList(params?: any): Promise<Result> {
  return request<Result>({
    url: '/users',
    method: 'get',
    params,
  });
}

// 基础的 POST 请求
export function createUser(data: any): Promise<Result> {
  return request<Result>({
    url: '/users',
    method: 'post',
    data,
  });
}
// 基础的 POST 请求
export function loginUser(data: any): Promise<Result> {
  return request<Result>({
    url: '/users/login',
    method: 'post',
    data,
  });
}
// 更新用户信息的 PUT 请求
export function updateUser(id: string | number, data: any): Promise<Result> {
  return request<Result>({
    url: `/users/${id}`,
    method: 'put',
    data,
  });
}

// 删除用户的 DELETE 请求
export function deleteUser(id: string | number): Promise<Result> {
  return request<Result>({
    url: `/users/${id}`,
    method: 'delete',
  });
}
