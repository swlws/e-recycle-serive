/**
 * 任务状态
 */
export enum ENUM_TASK_STATE {
  PENDDING = "PENDDING",
  WILL_RESOLVE = "WILL_RESOLVE", // 即将执行
  RESOLVE = "RESOLVE",
}

/**
 * 微信环境
 */
export enum ENUM_WX_ENV {
  /** 正式版  */
  RELEASE = "release",
  /** 开发版  */
  DEVELOP = "develop",
  /** 体验版  */
  TRIAL = "trial",
}
