import { CronJob } from "cron";

/**
 * 注册任务：任务的执行中状态同步
 */
function register_task_doing_state_sync() {
  // 每五分钟执行一次
  // const job = new CronJob("*/5 * * * *", sync_task_doing_state_job);
  // job.start();
}

// register_task_doing_state_sync();
