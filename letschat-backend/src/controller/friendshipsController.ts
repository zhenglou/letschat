import { Request, Response } from 'express';
import { list, general, listOne, deleteFriendship, modify, listByPage } from '@/services/friendshipsService';
import { ResponseHelper } from '@/utils/response';
import { FriendshipType } from '@/types/friendShips';
import { Pagination } from '@/types/response';
import mongoose from 'mongoose';

// 获取所有好友关系，支持分页
export const getAllFriendships = async (req: Request, res: Response) => {
  const pageInfo: Pagination = {
    currentPage: Number(req.query.pageNo) || 1,
    pageSize: Number(req.query.pageSize) || 10
  };
  try {
    const { total, friendshipsByPage } = await listByPage(pageInfo);
    res.status(200).json(ResponseHelper.success(friendshipsByPage, pageInfo, total));
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(400, error));
  }
};

// 查询好友关系(通过id或requester+recipient)
export const getFriendshipByIdOrUsers = async (req: Request, res: Response) => {
  try {
    const { id, requester, recipient } = req.query;
    let key = 0;
    let fs: any = {};
    if (id) {
      key = 0;
      fs.id = id;
    } else if (requester && recipient) {
      key = 1;
      fs.requester = new mongoose.Types.ObjectId(requester as string);
      fs.recipient = new mongoose.Types.ObjectId(recipient as string);
    } else {
      res.status(400).json(ResponseHelper.error(400, '请提供id或requester+recipient参数'));
      return;
    }
    const result = await listOne(key, fs);
    res.status(200).json(ResponseHelper.success(result));
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(400, error));
  }
};

// 创建好友关系
export const createFriendship = async (req: Request, res: Response) => {
  try {
    res.status(200).json(ResponseHelper.success(await general(req.body)));
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(400, error));
  }
};

// 删除好友关系
export const deleteFriendshipOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json(ResponseHelper.error(400, '请提供id参数'));
      return;
    }
    const fs: any = { id };
    const result = await deleteFriendship(fs);
    res.status(200).json(ResponseHelper.success(result));
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(400, error));
  }
};

// 修改好友关系
export const updateFriendship = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { requester, recipient, status } = req.body;
    const fs: any = {
      id,
      requester: new mongoose.Types.ObjectId(requester),
      recipient: new mongoose.Types.ObjectId(recipient),
      status
    };
    const result = await modify(fs);
    if (result === 1) {
      res.status(200).json(ResponseHelper.success('好友关系更新成功'));
    } else {
      res.status(400).json(ResponseHelper.error(400, '未找到好友关系'));
    }
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(400, error.message));
  }
};
