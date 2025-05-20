import { Schema, Types } from "mongoose";
import { UserSummary } from "./messageType"

export type Group = {
  _id?:string | null | Types.ObjectId;
  groupName: string,
  desc?: string,
  owner: UserSummary
  members: Array<UserSummary>
}
export type GroupSummary = {
  _id?:string | null | Types.ObjectId;
  groupName: string,
  desc?: string,
  owner: string
  members: Array<String | number>
}
export interface GroupSchema extends Document{
  groupName: string;
  desc: string;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
}
