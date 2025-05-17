import mongoose from 'mongoose';
import { ResponseHelper } from '@/utils/response';
import { userType } from '@/types/user'
import { Pagination } from '@/types/response';
import { Friendship } from './friendshipsModel';
import {  Document, Types } from 'mongoose';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },
  // age: {
  //   type: Number,
  //   min: [18, 'Age must be at least 18'],
  // },
  password: {
    type: String,
    required: [true, '密码不能为空'],
    minlength: [6, '密码长度至少6位'],
    select: false // 默认查询时不返回密码字段
  }
}, { timestamps: true, strict: true });
// userSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
//   const parentId = this._id;
//   await Friendship.deleteMany({ parent: parentId });
//   next();
// });
const User = mongoose.model('user', userSchema);

// 创建初始用户
export async function create(user: userType) {
  try {
    await User.create(user);
    return 1;
  } catch (error: any) {
    throw error
  }
}
// 登录
export async function findByNameAndPWd(user: userType) {
  try {
    const userInfo = await User.find({ name: user.name, password: user.password });
    return userInfo;
  } catch (error: any) {
    throw error
  }
}
// 查找用户示例
export async function find() {
  try {
    return User.find();
  } catch (error: any) {
    return error;
  }
}
// 分页查询
export async function findByPage(pageInfo: Pagination) {
  try {
    return User.find().skip((pageInfo.currentPage - 1) * pageInfo.pageSize).limit(pageInfo.pageSize);
  } catch (error: any) {
    return error;
  }
}
// 查找单个用户
export async function findOne(key: number, user: userType) {
  // console.log(user);
  try {
    if (key === 0) {
      // 通过id查询
      return User.findById(user.id);
    } else if (key === 1) {
      // 通过name查询
      return User.findOne({ name: user.name });
    }
    return null;
  } catch (error: any) {
    throw error;
  }
}
// 修改用户示例
export async function update(user: userType) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        name: user.name,
        password: user.password
      },
      { new: true, runValidators: true }
    );

    if (updatedUser) {
      return 1;
    } else {
      return 0;
    }
  } catch (error: any) {
    throw error;
  }
}
// 删除用户示例
export async function deleteOne(user: userType) {

  try {
    const result = await User.deleteOne({ _id: user.id });
    if (result.deletedCount > 0) {
      return 1;
    } else {
      return 0;
    }
  } catch (error: any) {
    return error;
  }
}
export async function findById(id:Types.ObjectId){
  try {
    return User.findById(id);
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

