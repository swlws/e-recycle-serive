import { getMongo } from "../../../lib/mongo";
import { ENUM_COLLECTION } from "../../../constant/collection_name";
import { ENUM_TASK_STATE } from "../../../constant/public";

/**
 * 获取当天正在执行中的任务数量
 * @returns {Promise<number>} 返回任务数量
 */
export async function count_today_active_tasks(): Promise<number> {
  try {
    // 获取今天的开始时间和结束时间
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    // 查询条件：
    // 1. 状态为正在处理中（WILL_RESOLVE）
    // 2. 创建时间在今天
    const query = {
      state: ENUM_TASK_STATE.WILL_RESOLVE,
      createTime: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    };

    const mongo = await getMongo();
    const cursor = await mongo.findCursor(ENUM_COLLECTION.T_TASK, query);
    return await cursor.count();
  } catch (error) {
    console.error("查询当天任务数量时发生错误:", error);
    return 0;
  }
}
