import { GroupSchema, GroupSummary } from '@/types/groupTypes';
import mongoose from 'mongoose';
import { Schema, model, Document, Model, Types } from 'mongoose';
const GroupSchema = new Schema<GroupSchema>({
  groupName: { type: String, required: true },
  desc: { type: String, default: '' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
}, { timestamps: true });

export const Groups = mongoose.model('groups', GroupSchema);
export async function create(group: GroupSummary) {
  try {
    return await Groups.create(group);;
  } catch (error) {
    throw error;
  }
}
export async function find(query?: any) {
  try {
    console.log(query);
    return query.members ? await Groups.find({members:{$in:[query.members]}}) : await Groups.find();
  } catch (error: any) {
    throw error;
  }
}




