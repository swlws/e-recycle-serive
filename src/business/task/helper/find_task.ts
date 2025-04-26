import { ENUM_COLLECTION } from "../../../constant/collection_name";
import { getMongo } from "../../../lib/mongo";
import { toObjectId } from "../../../tools/utils";

/**
 * 通过任务id查询任务
 * @param taskId
 * @returns
 */
export async function find_task_via_id(taskId: string) {
  const query = { _id: toObjectId(taskId) };
  const mongo = await getMongo();
  return await mongo.findOne(ENUM_COLLECTION.T_TASK, query);
}
