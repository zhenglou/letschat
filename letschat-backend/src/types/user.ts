import { Types } from 'mongoose';
export type userType = {
  id?:string | null | Types.ObjectId,
  name:string | null,
  // age:number | null,
  password:string,
  createdAt?: Date;
  updatedAt?: Date;
}