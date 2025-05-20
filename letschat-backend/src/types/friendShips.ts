import {  Document, Types } from 'mongoose';
// 定义好友关系文档接口
export interface FriendshipType {
  _id?:string | null | Types.ObjectId;
  requester: Types.ObjectId;
  recipient: Types.ObjectId;
  status?: 'pending' | 'accepted' | 'blocked';
  createdAt?: Date;
  updatedAt?: Date;
}
