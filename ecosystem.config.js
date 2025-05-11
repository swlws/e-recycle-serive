// 启动
// pm2 start app.js --watch --ignore-watch="node_modules"

// 重启
// pm2 restart all

// 停止
// pm2 stop all

// 删除
// pm2 delete all

// 列出所有应用
// pm2 list

// 查看应用程序数据
// pm2 show [id|name]

// 日志回滚
// https://github.com/keymetrics/pm2-logrotate#configure

module.exports = [
  {
    name: "e-recycle-server",
    script: "./dist/main.js",

    // watch 策略
    watch: ["dist"], // 监听 dist 目录，当有文件变化时重启
    watch_delay: 1000, // Specify delay between watch interval
    // ignore_watch: ['node_modules'],

    // 进程策略
    instances: 2, // 启用多少个实例
    exec_mode: "cluster", // 应用程序启动模式，这里设置的是cluster_mode（集群），默认是fork
    max_restarts: 3, // 设置应用程序异常退出重启的次数，默认15次（从0开始计数）

    // 重启策略
    restart_delay: 5000, // 自动重启之间的延迟
    max_memory_restart: "300M", // 设置应用程序重启的最大内存
    stop_exit_codes: [0], // 有时您可能希望应用程序在出现故障时自动重启（即非零退出代码），而不希望进程管理器在其正常关闭时重启它（即退出代码等于 0）。

    // 日志
    error_file: "/var/log/pm2/pm2-error.log",
    out_file: "/var/log/pm2/pm2-out.log",
    log_date_format: "YYYY-MM-DD HH:mm Z",
    merge_logs: true, //  when running mutiple process with same app name, do not split file by id

    // 环境
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },

    // 启动参数
    args: ["-e", "production"],
  },
];
