/**
 * 数据库集合名称
 */
export enum ENUM_COLLECTION {
  // 系统表
  T_SYSTEM = "t_system",
  // 日志表
  T_LOG = "t_log",

  /**
   * 通知表
   */
  T_NOTIFICATION = "t_notification",

  /**
   * 用户表
   */
  T_USER = "t_user",
  /**
   * 用户会话表
   */
  T_USER_SESSION = "t_user_session",
  /**
   * 用户指标
   */
  T_USER_INDICATE = "t_user_indicate",
  /**
   * 用户积分表
   */
  T_USER_GOLD = "t_user_gold",

  /**
   * 用户指标
   */
  T_TASK = "t_task",
  /**
   * 任务数量统计
   */
  T_TASK_STATISTIC = "t_task_statistic",
  /**
   * 任务报名表
   */
  T_TASK_SIGNUP = "t_task_signup",
  /**
   * 任务评论表
   */
  T_TASK_COMMENT = "t_task_comment",

  /**
   * 地址簿
   */
  T_ADDRESS_BOOK = "t_address_book",
}
