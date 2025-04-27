import { Router } from 'express';
import { getAllUsers, getUserById, createUser } from './controller';

const router = Router();

// 获取所有用户
router.get('/', getAllUsers);

// 获取单个用户
router.get('/:id', getUserById);

// 创建用户
router.post('/', createUser);

export default router; 