import { CronJob } from "cron";
import { check_invalid_task } from "./check_invalid_task";

/**
 * 注册任务：任务的执行中状态同步
 */
function register_task_doing_state_sync() {
  // 每五分钟执行一次
  const job = new CronJob("*/5 * * * *", check_invalid_task);
  job.start();
}

register_task_doing_state_sync();
