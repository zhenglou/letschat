// 成功响应类型
export type SuccessResponse<T = any> = {
  code: number;
  message: string;
  data: T | null;
  pagination?: Pagination; // 分页信息（可选）
};

// 分页类型
export interface Pagination {
  currentPage: number;
  pageSize: number;
  total?: number;
}

// 错误响应类型
export type ErrorResponse = {
  code: number;
  message: string;
  details?: any; // 开发调试信息（可选）
};