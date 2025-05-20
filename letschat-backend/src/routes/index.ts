import { Router } from 'express';
import userRoutes from '@/routes/userRouter';
import friendshipsRoutes from '@/routes/friendshipsRouter';
import groupRoutes from '@/routes/groupRouter';
// 引入其他路由模块

const router = Router();

// 注册各模块路由
router.use('/users', userRoutes);
router.use('/friendships', friendshipsRoutes);
router.use('/groups', groupRoutes);
// 注册其他模块路由



// router.get('/', getUsers);         // GET /users
// router.get('/:id', getUserById);    // GET /users/:id
// router.post('/', createUser);       // POST /users
// router.put('/:id', updateUser);     // PUT /users/:id
// router.delete('/:id', deleteUser);  // DELETE /users/:id

export default router; 