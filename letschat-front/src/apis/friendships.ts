import request, { Result } from "@/utils/request";
import { FriendshipType } from "@/types";
export function createFriendship(data: FriendshipType): Promise<Result> {
  return request<Result>({
    url: "/friendships",
    method: 'POST',
    data
  })
}
export function updateFriendship(data: FriendshipType): Promise<Result> {
  return request<Result>({
    url: "/friendships",
    method: 'PUT',
    data
  })
}

export function getFriendships(userId: string): Promise<Result> {
  return request<Result>({
    url: `/friendships/${userId}`,
    method: 'GET'
  })
}