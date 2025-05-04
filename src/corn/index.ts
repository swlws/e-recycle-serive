import { CronJob } from "cron";
import { check_invalid_task } from "./check_invalid_task";
import { auto_finish_task } from "./auto_finish_task";

/**
 * 注册任务：任务的执行中状态同步
 */
function register_task_doing_state_sync() {
  // 检测过期任务 - 每日00点01分触发
  const checkInvalidTaskJob = new CronJob("01 00 * * *", check_invalid_task);
  checkInvalidTaskJob.start();

  // 自动完成任务 - 每日00点02分触发
  const autoFinishTaskJob = new CronJob("02 00 * * *", auto_finish_task);
  autoFinishTaskJob.start();
}

register_task_doing_state_sync();
