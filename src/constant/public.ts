/**
 * 任务状态
 */
export enum ENUM_TASK_STATE {
  PENDDING = "PENDDING",
  WILL_RESOLVE = "WILL_RESOLVE", // 即将执行
  RESOLVE = "RESOLVE",
}

/**
 * 微信环境, taro 给出的统一值
 */
export enum ENUM_WX_ENV {
  /** 正式版  */
  RELEASE = "release",
  /** 开发版  */
  DEVELOP = "develop",
  /** 体验版  */
  TRIAL = "trial",
}

/**
 * 路由路径
 */
export enum ENUM_PATH_PATH {
  /** 发布单个任务 */
  PUBLISH_TASK = "/packageA/pages/publish-task/index",
  /** 任务详情 */
  TASK_DETAIL = "/packageA/pages/task-detail/index",
  /** 发布的 */
  PUBLISHED_LIST = "/packageB/pages/published-task-list/index",
  /** 交易中的 */
  IN_TRADING_LIST = "/packageB/pages/in-trading-list/index",
  /** 卖出的 */
  SELL_OUT_LIST = "/packageB/pages/sell-out-list/index",
  /** 买进的 */
  BUY_IN_LIST = "/packageB/pages/buy-in-list/index",
  /** 分享个人二维码 */
  USER_QR_CODE = "/packageC/pages/user-qr-code/index",
}
