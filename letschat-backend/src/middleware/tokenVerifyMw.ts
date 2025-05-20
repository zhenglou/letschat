import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/Jwt';
import { ResponseHelper } from "@/utils/response"
export const tokenVerifyMw = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const whitelist = ['/users/login'];
  
  if (whitelist.includes(req.path)) {
    return next(); // 跳过白名单路由
  }
  // 从请求头获取 token
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Bearer <token>

  if (!token) {
     res.status(401).json(ResponseHelper.error(401, "Access denied. No token provided"));
     return;
  }

  try {
    const decoded = verifyToken(token); 
    if(decoded == null){
      res.status(401).json(ResponseHelper.error(401, "Access denied. token Invalid"));
      return
    }
    // // 将解码后的用户信息附加到请求对象
    // req.user = {
    //   userId: decoded.userId,
    //   role: decoded.role
    //   // 其他需要的字段...
    // };
    
    next();
  } catch (error) {
    // Token 验证失败的处理
    const errorMessage = (error as Error).message;

    if (errorMessage.includes('expired')) {
       res.status(403).json({
        success: false,
        message: 'Token expired'
      });
    }

     res.status(403).json({
      success: false,
      message: 'Invalid token'
    });
  }
};