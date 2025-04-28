import { Request, Response } from 'express';
import { list, general } from "@/services/userService"
import { ResponseHelper } from "@/utils/response"

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await list();
    res.status(200).json(ResponseHelper.success(user));
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(400,error));
  }

};

export const getUserById = (req: Request, res: Response) => {
  res.json({ message: `获取ID为${req.params.id}的用户` });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json(ResponseHelper.success(await general(req.body)));
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(400,error));
  }
};

export const deleteUser = (req: Request, res: Response) => {
  res.json({ message: '删除用户', data: req.body });
};

export const updateUser = (req: Request, res: Response) => {
  res.json({ message: '修改用户', data: req.body });
}; 