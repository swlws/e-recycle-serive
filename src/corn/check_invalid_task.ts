import { getMongo } from "../lib/mongo";
import { ENUM_COLLECTION } from "../constant/collection_name";
import { ENUM_TASK_STATE } from "../constant/public";
import logger from "../lib/logger";
import { getNowYMDHMS } from "../tools/time";
import { batch_insert_log } from "../business/log/insert_log";

export async function check_invalid_task() {
  try {
    const mongo = await getMongo();
    const now = new Date();

    // 查找并更新所有执行时间大于当前时间的任务
    const query = {
      pickupTime: { $lt: getNowYMDHMS() },
      state: { $ne: ENUM_TASK_STATE.INVALID },
    };

    const update = {
      state: ENUM_TASK_STATE.INVALID,
      updateTime: now,
    };

    const result = await mongo.updateMany(
      ENUM_COLLECTION.T_TASK,
      query,
      update,
      {}
    );

    const { modifiedCount } = result;

    await batch_insert_log({
      type: "system",
      content: `成功将 ${modifiedCount} 个过期任务设置为无效状态`,
    });
    logger.info(`成功将 ${modifiedCount} 个过期任务设置为无效状态`);
  } catch (error) {
    logger.error("更新任务状态时发生错误:", error);
  }
}
