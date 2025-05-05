import { create, find, findOne, deleteOne, update, findByPage, findByNameAndPWd } from "@/models/userModel"
import { userType } from '@/types/user'
import { Pagination } from '@/types/response';
import { signToken } from "@/utils/Jwt";

export const list = () => {
  return find();
}

export const listOne = (key: number, user: userType) => {
  return findOne(key, user);
}
export const listByPage = async (pageInfo: Pagination) => {
  const users = await find();
  const usersBypage = await findByPage(pageInfo);
  return {
    total: users.length,
    usersBypage
  }
}

export const general = async (user: userType) => {
  try {
    const createdUser = await create(user);
    return { createdStatus: createdUser };
  } catch (error) {
    throw error;
  }
}

export const modify = (user: userType) => {
  return update(user);
}

export const deleteUser = (user: userType) => {
  return deleteOne(user);
}
export const userLoginService = async (user: userType) => {
  const userInfo = await findByNameAndPWd(user);
  if (userInfo.length != 0) {
    const token = signToken({ name: user.name, id: userInfo[0].id });
    return { userInfo:userInfo[0], token }
  }
  throw "用户不存在"
}