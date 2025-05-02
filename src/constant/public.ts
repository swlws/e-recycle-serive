/**
 * 任务状态
 */
export enum ENUM_TASK_STATE {
  // 初始态
  PENDDING = "PENDDING",
  // 即将执行 - 任务已被接单
  WILL_RESOLVE = "WILL_RESOLVE",
  // 任务完成
  RESOLVE = "RESOLVE",
  // 过期
  INVALID = "INVALID",
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

/** 积分来源类型 */
export enum ENUM_SCORE_SOURCE_TYPE {
  /** 邀请 */
  INVITE = "invite",
}

/** 积分来源类型对应的得分 */
export const SCORE_SOURCE_TYPE_MAP = {
  [ENUM_SCORE_SOURCE_TYPE.INVITE]: 10,
};
