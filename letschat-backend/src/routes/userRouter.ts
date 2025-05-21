import { Router } from 'express';
import { getAllUsers, getUserByNameOrId, createUser, deleteUserOne, updateUser,userLogin } from '@/controller/userController';
// import express from 'express';
const router = Router();

// 获取所有用户
router.get('/', getAllUsers);
// 查询用户(支持通过id或name查询)
router.get('/getUserByNameOrId', getUserByNameOrId);

// 创建用户
router.post('/create', createUser);
router.post('/login', userLogin);

// 修改用户信息
router.put('/:id', updateUser);


// 删除用户
router.delete('/:id', deleteUserOne);

export default router; 