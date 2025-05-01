import { create, find, findOne, deleteOne, update, findByPage } from "@/models/userModel"
import { userType } from '@/types/user'
import { Pagination } from '@/types/response';
export const list = () => {
  return find();
}

export const listOne = (key: number, user: userType) => {
  return findOne(key, user);
}
export const listByPage = (pageInfo:Pagination) => {
  return findByPage(pageInfo);
}

export const general = (user: userType) => {
  return create(user);
}

export const modify = (user: userType) => {
  return update(user);
}

export const deleteUser = (user: userType) => {
  return deleteOne(user);
}
