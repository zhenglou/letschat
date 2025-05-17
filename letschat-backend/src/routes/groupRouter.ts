import { Router } from 'express';
import { getGroupList, createGroup } from '@/controller/groupController';
// import express from 'express';
const router = Router();


router.get('/', getGroupList);
// 

router.post('/', createGroup);


export default router; 