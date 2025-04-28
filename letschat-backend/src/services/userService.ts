import { create,find,findOne } from "@/models/userModel"
import { userType } from '@/types/user' 
export const list = ()=>{
  return find();
}
export const listOne = ()=>{
  return findOne();
}
export const general = (user:userType)=>{
  return create(user);
}
export const modify = ()=>{
  return find();
}
export const deleteOne = ()=>{
  return find();
}
