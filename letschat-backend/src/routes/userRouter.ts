import { Router } from 'express';
import { getAllUsers, getUserByNameOrId, createUser, deleteUserOne, updateUser } from '@/controller/userController';
import express from 'express';

const router = Router();

// 获取所有用户
router.get('/', getAllUsers);


// 查询用户(支持通过id或name查询)
router.get('/getUserByNameOrId', getUserByNameOrId);

// 创建用户
router.post('/', createUser);

// 删除用户
router.delete('/:id', deleteUserOne);

// 修改用户信息
router.put('/:id', updateUser);
export default router; 