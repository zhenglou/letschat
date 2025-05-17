import request, { Result } from "@/utils/request";
const baseURL = "/groups"
export function getGroupList(params?: any): Promise<Result> {
  return request<Result>({
    url: '/groups',
    method: 'get',
    params,
  });
}
export function createGroup(data: any): Promise<Result> {
  return request<Result>({
    url: '/groups',
    method: 'post',
    data,
  });
}