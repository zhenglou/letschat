import { Request, Response } from 'express';

export const getAllUsers = (req: Request, res: Response) => {
  res.json({ message: '获取所有用户列表' });
};

export const getUserById = (req: Request, res: Response) => {
  res.json({ message: `获取ID为${req.params.id}的用户` });
};

export const createUser = (req: Request, res: Response) => {
  res.json({ message: '创建新用户', data: req.body });
}; 