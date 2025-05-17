import { create, find, findOne, deleteOne, update, findByPage, findByReqAndRec } from "@/models/friendshipsModel";
import { FriendshipType } from '@/types/friendShips';
import { Pagination } from '@/types/response';
import { findById } from "@/models/userModel";
import { Friendship } from "@/models/friendshipsModel";
import { userType } from "@/types/user";
import { Types } from "mongoose";

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

export const general = async (fs: FriendshipType) => {
  try {
    const { requester, recipient } = fs;
    let newReq: Types.ObjectId;
    let newRec: Types.ObjectId;
    if (requester > recipient) {
      console.log("requester > recipient");
      newReq = requester;
      newRec = recipient;
    } else {
      console.log("requester < recipient");
      newReq = recipient;
      newRec = requester;
    }
    const res = await create({ requester: newReq, recipient: newRec });
    if (!res) {
      return await findByReqAndRec(newReq, newRec);
    }
    return res;
  } catch (error) {
    throw error
  }

}

export const modify = async (fs: FriendshipType) => {
  return await update(fs);
}

export const deleteFriendship = (fs: FriendshipType) => {
  return deleteOne(fs);
}

export const listFriendshipDetail = async (fs: FriendshipType) => {
  const recipientInfo = await findById(fs.recipient)
  const requesterInfo = await findById(fs.requester)
  return { recipientInfo, requesterInfo }
  // return findByPage(fs);
}

export const findListByUserId = async (userId: string) => {
  // 查询所有与用户相关的好友关系
  const friendships = await find({ $or: [{ requester: userId }, { recipient: userId }] });

  // 处理查询结果，获取每个好友关系中对方的用户信息
  if (friendships.length > 0) {
    const friendshipsArray: FriendshipType[] = [];
    const friendshipDetailsArray: userType[] = [];

    await Promise.all(
      friendships.map(async (friendship: FriendshipType) => {
        // 确定对方用户的ID（不是当前用户的那个）
        const otherUserId = friendship.requester.toString() === userId
          ? friendship.recipient
          : friendship.requester;

        // 查询对方用户的信息
        const otherUserInfo = await findById(otherUserId);

        // 将数据添加到各自的数组中
        friendshipsArray.push(friendship);
        if (otherUserInfo) {
          friendshipDetailsArray.push(otherUserInfo);
        }
      })
    );

    return {
      friendships: friendshipsArray,
      friendshipDetails: friendshipDetailsArray
    };
  }
  return {
    friendships: [] ,
    friendshipDetails: []
  };
}

