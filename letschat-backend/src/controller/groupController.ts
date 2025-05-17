import { GroupSchema, GroupSummary } from '@/types/groupTypes';
import { Request, Response } from 'express';
import { list, general } from "@/services/groupService"
import { ResponseHelper } from '@/utils/response';
export const getGroupList = async (req: Request, res: Response) => {
  const {members} = req.query;
  if(members){
    try {
      res.status(200).json(ResponseHelper.success(await list(req.query)));
    } catch (error) {
      res.status(400).json(ResponseHelper.error(400,error));
    }
    
  }else{
    try {
      res.status(200).json(ResponseHelper.success(await list()));
    } catch (error) {
      res.status(400).json(ResponseHelper.error(400,error));
    }
  }
  
  // 
}
export const createGroup = async (req: Request, res: Response) => {
  try {
    res.status(200).json(ResponseHelper.success( await general(req.body)));
  } catch (error) {
    res.status(400).json(ResponseHelper.error(400,error));
  }
}
// export const getGoupsList = async (req: Request, res: Response) => {
  
// }