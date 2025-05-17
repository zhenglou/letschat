import mongoose from 'mongoose';
import { Schema, model, Document, Model, Types } from 'mongoose';
import { FriendshipType } from '@/types/friendShips'
import { Pagination } from '@/types/response';
const friendshipSchema: Schema<FriendshipType> = new mongoose.Schema({
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'blocked'],
    default: 'pending'
  }
},
  {
    timestamps: true,
  });

// 正确添加唯一索引
friendshipSchema.index({ requester: 1, recipient: 1 }, { unique: true });

export const Friendship = mongoose.model('friendships', friendshipSchema);
// 创建好友关系
export async function create(fs: FriendshipType) {
  try {
    return await Friendship.create(fs);
  } catch (error: any) {
    return 0;
  }
}
// 查询所有好友关系
export async function find(query?: any) {
  try {
    return query ? Friendship.find(query) : Friendship.find();
  } catch (error: any) {
    return error;
  }
}
// 分页查询好友关系
export async function findByPage(pageInfo: Pagination) {
  try {
    return Friendship.find().skip((pageInfo.currentPage - 1) * pageInfo.pageSize).limit(pageInfo.pageSize);
  } catch (error: any) {
    return error;
  }
}
// 查找单个好友关系
export async function findOne(key: number, fs: FriendshipType) {
  try {
    if (key === 0 && fs._id) {
      // 通过id查询
      return Friendship.findById(fs._id);
    } else if (key === 1 && fs.requester && fs.recipient) {
      // 通过 requester 和 recipient 查询
      return Friendship.findOne({ requester: fs.requester, recipient: fs.recipient });
    }
    return null;
  } catch (error: any) {
    throw error;
  }
}
// 修改好友关系
export async function update(fs: FriendshipType) {
  try {
    const updated = await Friendship.findByIdAndUpdate(
      fs._id,
      {
        requester: fs.requester,
        recipient: fs.recipient,
        status: fs.status
      },
      { new: true, runValidators: true }
    );
    if (updated) {
      return 1;
    } else {
      return 0;
    }
  } catch (error: any) {
    throw error;
  }
}
// 删除好友关系
export async function deleteOne(fs: FriendshipType) {
  try {
    const result = await Friendship.deleteOne({ _id: fs._id });
    if (result.deletedCount > 0) {
      return 1;
    } else {
      return 0;
    }
  } catch (error: any) {
    return error;
  }
}

export async function findByReqAndRec(requester: Types.ObjectId,recipient:Types.ObjectId) {
  try {
    return Friendship.findOne({ requester,recipient });
  } catch (error: any) {
    throw error;  
  }
}
