import { Router } from 'express';
import { getAllUsers, getUserById, createUser, deleteUser, updateUser } from '@/controller/userController';

const router = Router();

// 获取所有用户
router.get('/', getAllUsers);

// 获取单个用户
router.get('/:id', getUserById);

// 创建用户
router.post('/', createUser);

// 删除用户
router.delete('/:id', deleteUser);

// 修改用户信息
router.put('/:id', updateUser);
export default router; 