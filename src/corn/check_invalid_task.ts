import { getMongo } from "../lib/mongo";
import { ENUM_COLLECTION } from "../constant/collection_name";
import { ENUM_TASK_STATE } from "../constant/public";
import logger from "../lib/logger";

export async function check_invalid_task() {
  try {
    const mongo = await getMongo();
    const now = new Date();

    // 查找并更新所有执行时间大于当前时间的任务
    const query = {
      pickupTime: { $lt: now },
      state: { $ne: ENUM_TASK_STATE.INVALID },
    };

    const update = {
      $set: {
        state: ENUM_TASK_STATE.INVALID,
        updateTime: now,
      },
    };

    const result = await mongo.updateMany(
      ENUM_COLLECTION.T_TASK,
      query,
      update,
      {}
    );

    console.log(`成功将 ${result} 个过期任务设置为无效状态`);
    logger.info(`成功将 ${result} 个过期任务设置为无效状态`);
  } catch (error) {
    console.error("更新任务状态时发生错误:", error);
    logger.error("更新任务状态时发生错误:", error);
  }
}

check_invalid_task();
