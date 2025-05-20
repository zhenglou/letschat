import { find, create } from "@/models/groupModel"
import { GroupSchema, GroupSummary } from '@/types/groupTypes';
import { findById as findUser } from "@/models/userModel"

export const list = async (query?: any) => {
  try {
    const groupInfo = query ? await find(query) : await find();
    const newGroupInfo = await Promise.all(groupInfo.map(async (e) => {
      const owner = await findUser(e.owner)
      const members = await Promise.all(e.members.map(async (memberId) => {
        return await findUser(memberId);
      }));
      return { _id:e._id,groupName:e.groupName,desc:e.desc, owner, members }
    }));
    
    return newGroupInfo;
  } catch (error) {
    throw error;
  }
}

export const general = async (group: GroupSummary) => {
  try {
    return await create(group)
  } catch (error) {
    throw error;
  }
}

