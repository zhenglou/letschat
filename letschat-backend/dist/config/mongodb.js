"use strict";
const mongoose = require('mongoose');
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/letschat', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to letschat');
    }
    catch (err) {
        console.error('❌ Connection error:', err);
    }
}
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }
});
const User = mongoose.model('chat_history', userSchema);
// // 3. 插入数据示例
// async function createUser() {
//   const user = new User({ name: 'Alice',age:18 });
//   await user.save();
//   console.log('User created:', user);
// }
// // 查找用户示例
// async function findUser(name) {
//   const user = await User.find();
//   if (user) {
//     console.log('找到用户:', user);
//   } else {
//     console.log('未找到用户');
//   }
// }
// // 修改用户示例
// async function updateUser(name, newData) {
//   const user = await User.findOneAndUpdate({ name: name }, newData, { new: true });
//   if (user) {
//     console.log('用户已更新:', user);
//   } else {
//     console.log('未找到用户以更新');
//   }
// }
// // 删除用户示例
// async function deleteUser(name) {
//   const result = await User.deleteOne({ name: name });
//   if (result.deletedCount > 0) {
//     console.log('用户已删除');
//   } else {
//     console.log('未找到用户以删除');
//   }
// }
// connectDB().then(() => createUser());
