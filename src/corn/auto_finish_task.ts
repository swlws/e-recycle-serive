import { getMongo } from "../lib/mongo";
import { ENUM_COLLECTION } from "../constant/collection_name";
import { ENUM_TASK_STATE } from "../constant/public";
import logger from "../lib/logger";
import { getNowYMD, getNowYMDHMS } from "../tools/time";
import { batch_insert_log } from "../business/log/insert_log";

export async function auto_finish_task() {
  try {
    const mongo = await getMongo();

    // 查找并更新所有执行时间大于当天时间的任务
    const query = {
      pickupTime: { $lt: getNowYMD() + " 23:59:59" },
      state: { $eq: ENUM_TASK_STATE.WILL_RESOLVE },
    };

    const update = {
      state: ENUM_TASK_STATE.RESOLVE,
      updateTime: getNowYMDHMS(),
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
      content: `自动完成 ${modifiedCount} 个任务`,
    });
    logger.info(`自动完成 ${modifiedCount} 个任务`);
  } catch (error) {
    logger.error("自动完成任务时发生错误:", error);
  }
}
