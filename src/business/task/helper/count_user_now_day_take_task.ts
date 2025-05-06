import { getMongo } from "../../../lib/mongo";
import { ENUM_COLLECTION } from "../../../constant/collection_name";
import { ENUM_TASK_STATE } from "../../../constant/public";
import { toObjectId } from "../../../tools/utils";
import { getNowYMD } from "../../../tools/time";

/**
 * 统计用户当前接单数量
 * @returns {Promise<number>} 返回任务数量
 */
export async function count_user_now_day_take_task(
  uid: string
): Promise<number> {
  try {
    const now = getNowYMD();

    // 查询条件：
    // 1. 状态为正在处理中（WILL_RESOLVE）
    // 2. 接单时间在今天
    const query = {
      dealWithUid: toObjectId(uid),
      state: ENUM_TASK_STATE.WILL_RESOLVE,
      takeTime: {
        $gte: `${now} 00:00:00`,
        $lt: `${now} 23:59:59`,
      },
    };

    const mongo = await getMongo();
    const cursor = await mongo.findCursor(ENUM_COLLECTION.T_TASK, query);
    const count = await cursor.count();
    return count;
  } catch (error) {
    return 0;
  }
}
