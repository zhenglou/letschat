import { Router } from 'express';
import { getAllFriendships, getFriendshipByIdOrUsers, createFriendship, deleteFriendshipOne, updateFriendship,getFriendshipListById } from '@/controller/friendshipsController';
import express from 'express';

const router = Router();

// 获取所有好友关系
router.get('/', getAllFriendships);

// 获取好友关系(通过id)
router.get('/:userId', getFriendshipListById);

// 查询好友关系(支持通过id或requester+recipient查询)
router.get('/getFriendshipByIdOrUsers', getFriendshipByIdOrUsers);

// 创建好友关系
router.post('/', createFriendship);

// 删除好友关系
router.delete('/:userId', deleteFriendshipOne);

// 修改好友关系
router.put('/', updateFriendship);

export default router;
