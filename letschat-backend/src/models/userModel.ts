import mongoose from 'mongoose';
import { ResponseHelper } from '@/utils/response';
import { userType } from '@/types/user'

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

const User = mongoose.model('user', userSchema);

// 创建初始用户
export async function create(user: userType) {
  try{
    new User(user).save();
    return 1;
  }catch(error:any){
    throw error
  }
 
}
// 查找用户示例
export async function find() {
  const user = await User.find();
  if (user) {
    return ResponseHelper.success(user)
  } else {
    return ResponseHelper.error(0, "not find")
  }
}
// 查找用户示例
export async function findOne() {
  const user = await User.find();
  if (user) {
    console.log('找到用户:', user);
  } else {
    console.log('未找到用户');
  }
}
// // 修改用户示例
//export  async function update(name, newData) {
//   const user = await User.findOneAndUpdate({ name: name }, newData, { new: true });
//   if (user) {
//     console.log('用户已更新:', user);
//   } else {
//     console.log('未找到用户以更新');
//   }
// }
// // 删除用户示例
//export  async function delete(name) {
//   const result = await User.deleteOne({ name: name });
//   if (result.deletedCount > 0) {
//     console.log('用户已删除');
//   } else {
//     console.log('未找到用户以删除');
//   }
// }

