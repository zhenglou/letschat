import { SuccessResponse, ErrorResponse, Pagination } from '@/types/response';
export class ResponseHelper {
  /**
   * 成功响应
   * @param data 响应数据
   * @param pagination 分页信息
   */
  static success<T>(data: T | null = null, pagination?: Pagination, total?: number): SuccessResponse<T> {
    return {
      code: 200,
      message: 'success',
      data,
      ...(pagination && { pagination }),
      total
    };
  }

  /**
   * 错误响应
   * @param code 业务错误码
   * @param message 错误信息
   * @param details 错误详情（可选）
   */
  static error(code: number, message: string, details?: any): ErrorResponse {
    return {
      code,
      message,
      ...(details && { details }),
    };
  }
}