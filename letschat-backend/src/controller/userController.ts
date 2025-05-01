import { Request, Response } from 'express';
import { list, general, listOne, deleteUser, modify, listByPage } from "@/services/userService"
import { ResponseHelper } from "@/utils/response"
import { userType } from '@/types/user'
import { Pagination } from '@/types/response';
export const getAllUsers = async (req: Request, res: Response) => {
  const name = typeof req.query.username === 'string' ? req.query.username : '';
  const pageInfo: Pagination = { currentPage: Number(req.query.pageNo), pageSize: Number(req.query.pageSize) }
  try {
    if (name) {
      res.status(200).json(ResponseHelper.success([await listOne(1, { id: "", name, password: "" })]));
      return;
    }
    5
    if (pageInfo) {
      res.status(200).json(ResponseHelper.success(await listByPage(pageInfo), pageInfo));
      return;
    }
    res.status(200).json(ResponseHelper.success(await list()));
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(400, error));
  }

};

export const getUserByNameOrId = async (req: Request, res: Response) => {
  try {
    const user = req.query;
    // console.log(req.query);
    // console.log(req.params);

    if (user.id) {
      // 通过ID查询
      res.status(200).json(ResponseHelper.success(await listOne(0, user as userType)));
    } else if (user.name) {
      // 通过name查询
      res.status(200).json(ResponseHelper.success(await listOne(1, user as userType)));
    } else {
      res.status(400).json(ResponseHelper.error(400, '请提供id或name参数'));
    }
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(400, error));
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json(ResponseHelper.success(await general(req.body)));
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(400, error));
  }
};

export const deleteUserOne = async (req: Request, res: Response) => {
  try {
    const user = req.params;
    res.status(200).json(ResponseHelper.success(await deleteUser(user as userType)));
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(400, error))
  }

};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    console.log(updateData, "2");

    // 组合用户数据
    const userData: userType = {
      id: userId,
      name: updateData.name,
      password: updateData.password
    };
    console.log(userData, "1");

    const result = await modify(userData);

    if (result === 1) {
      res.status(200).json(ResponseHelper.success('用户更新成功'));
    } else {
      res.status(400).json(ResponseHelper.error(400, '未找到用户'));
    }
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(400, error.message));
  }
}; 