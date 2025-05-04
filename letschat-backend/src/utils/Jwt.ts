import jwt, { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';

const SECRET_KEY = process.env.JWT_SECRET || '2H46LGSdgMeULDmAhGbq5aoxBGcwTICq'; // 建议生产环境用环境变量
const EXPIRES_IN: number | StringValue = '7d'; // 默认7天

export interface TokenPayload {
  name: string | null;
  [key: string]: any;
}

/**
 * 生成JWT
 * @param payload Token载荷
 * @param expiresIn 过期时间（如'1d','7d'等）
 */
export function signToken(payload: TokenPayload, expiresIn: number | StringValue = EXPIRES_IN): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET_KEY, options);
}

/**
 * 验证JWT
 * @param token 待验证token
 * @returns payload对象或null
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, SECRET_KEY) as TokenPayload;
  } catch (err) {
    return null;
  }
}
