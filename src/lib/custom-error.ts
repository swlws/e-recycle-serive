/**
 * 错误码枚举
 */
export enum ENUM_CUSTOM_ERROR_CODE {
  // 成功
  SUCCESS = 0,
  // 通用错误
  ERROR = 1,
  // 服务不可达，系统维护中
  SYSTEM_UPGRADE = 1503,

  // Auth 认证失败
  AUTH_FAILED = 1401,
}

/**
 * 自定义错误类
 */
export default class CustomError extends Error {
  constructor(
    message: string,
    public code: ENUM_CUSTOM_ERROR_CODE = ENUM_CUSTOM_ERROR_CODE.ERROR
  ) {
    super(message);

    this.code = code;
  }
}
