import { Request, Response } from 'express';
import { list, general, listOne, deleteUser, modify, listByPage, userLoginService } from "@/services/userService"
import { ResponseHelper } from "@/utils/response"
import { userType } from '@/types/user'
import { Pagination } from '@/types/response';
import { signToken, verifyToken } from '@/utils/Jwt';
export const getAllUsers = async (req: Request, res: Response) => {
  const name = typeof req.query.name === 'string' ? req.query.name : '';
  const pageInfo: Pagination = { currentPage: Number(req.query.pageNo), pageSize: Number(req.query.pageSize) }

  try {
    if (name) {

      res.status(200).json(ResponseHelper.success([await listOne(1, { name, password: "" })]));
      return;
    }
    if (pageInfo) {
      const { total, usersBypage } = await listByPage(pageInfo);
      res.status(200).json(ResponseHelper.success(usersBypage, pageInfo, total));
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

    const userObj: userType = {
      id: typeof user.id === 'string' ? user.id : '',
      name: typeof user.name === 'string' ? user.name : '',
      password: '' // 这里没有密码参数就设为空
    };

    if (user.id) {
      // 通过ID查询
      res.status(200).json(ResponseHelper.success(await listOne(0, userObj)));
    } else if (user.name) {
      // 通过name查询
      res.status(200).json(ResponseHelper.success(await listOne(1, userObj)));
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
    const userObj: userType = {
      id: typeof user.id === 'string' ? user.id : '',
      name: typeof user.name === 'string' ? user.name : '',
      password: '' // 这里没有密码参数就设为空
    };
    res.status(200).json(ResponseHelper.success(await deleteUser(userObj)));
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(400, error))
  }

};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // 组合用户数据
    const userData: userType = {
      id: userId,
      name: updateData.name,
      password: updateData.password
    };

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
export const userLogin = async (req: Request, res: Response) => {

  // const token = signToken({ id: "2", name: "zhenglou" })
  // const k = verifyToken(token);
  // console.log(k);
  try {
    res.status(200).json(ResponseHelper.success(
      await userLoginService(req.body)
    ))
  } catch (error: any) {
    res.status(400).json(ResponseHelper.error(
      400, error
    ))
  }

}; 