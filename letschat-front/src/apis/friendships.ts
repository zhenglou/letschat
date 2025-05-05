import request, { Result } from "@/utils/request";
type FSType = {
  requester:string,
  recipient:string
}
export function createFriendship(data:FSType):Promise<Result>{
  return request<Result>({
    url:"/friendships",
    method:'POST',
    data
  })
}