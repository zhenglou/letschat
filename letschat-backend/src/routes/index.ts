import { Router } from 'express';
import userRoutes from '@/services/users/router';
// 引入其他路由模块

const router = Router();

// 注册各模块路由
router.use('/users', userRoutes);
// 注册其他模块路由

export default router; 