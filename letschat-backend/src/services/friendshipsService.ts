import { create, find, findOne, deleteOne, update, findByPage } from "@/models/friendshipsModel";
import { FriendshipType } from '@/types/friendShips';
import { Pagination } from '@/types/response';

export const list = () => {
  return find();
}

export const listOne = (key: number, fs: FriendshipType) => {
  return findOne(key, fs);
}

export const listByPage = async (pageInfo: Pagination) => {
  const friendships = await find();
  const friendshipsByPage = await findByPage(pageInfo);
  return {
    total: friendships.length,
    friendshipsByPage
  };
}

export const general = (fs: FriendshipType) => {
  return create(fs);
}

export const modify = (fs: FriendshipType) => {
  return update(fs);
}

export const deleteFriendship = (fs: FriendshipType) => {
  return deleteOne(fs);
}
