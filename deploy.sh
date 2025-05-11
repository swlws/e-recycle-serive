#!/bin/bash

# 定义服务器选项数组
options=(
    "dev - root@dev.swlws.site"
    "prod - root@12.swlws.site"
)

# 显示服务器列表
echo "可用的服务器列表（共 ${#options[@]} 个）："
PS3="请选择目标服务器 [1-${#options[@]}]: "

# 使用 select 进行选择
select choice in "${options[@]}"; do
    if [ -n "$choice" ]; then
        # 解析选择的服务器信息
        SERVER_KEY=$(echo $choice | cut -d'-' -f1 | xargs)
        REMOTE_HOST=$(echo $choice | cut -d'-' -f2 | xargs)
        break
    else
        echo "错误：无效的选择，请输入 1 到 ${#options[@]} 之间的数字"
    fi
done

echo "已选择服务器: $REMOTE_HOST ($SERVER_KEY)"

# 定义远程服务器信息
# REMOTE_HOST="root@47.95.159.234"
REMOTE_PATH="/root/e-recycle-server"
DIST_ZIP="dist.zip"

# 显示帮助信息的函数
show_help() {
    echo "使用方法: ./deploy.sh [选项]"
    echo "选项:"
    echo "  -h, --help     显示帮助信息"
    echo "  -b, --build    仅执行构建"
    echo "  -d, --deploy   仅执行部署"
    echo "  无参数         执行完整的构建和部署流程"
}

# 构建函数
build() {
    echo "开始构建..."
    pnpm tsc
    if [ $? -ne 0 ]; then
        echo "构建失败"
        exit 1
    fi
    echo "构建完成"

    echo "打包dist目录..."
    zip -rq $DIST_ZIP ./dist
    echo "打包完成"
}

# 部署函数
deploy() {
    echo "开始部署..."
    
    # 创建远程目录
    echo "创建远程目录..."
    ssh $REMOTE_HOST "mkdir -p ${REMOTE_PATH}"

    # 上传dist.zip到远程服务器
    # 使用 rsync 上传所有文件，排除不需要的文件
    echo "上传文件到远程服务器..."
    scp dist.zip package.json ecosystem.config.js $REMOTE_HOST:${REMOTE_PATH}/
    if [ $? -ne 0 ]; then
        echo "文件上传失败"
        exit 1
    fi

    # 安装 node_modules
    echo "安装 node_modules..."
    ssh $REMOTE_HOST "cd ${REMOTE_PATH}
        if [ ! -d ${REMOTE_PATH}/node_modules ]; then
            cd ${REMOTE_PATH} && \
            npm install
        fi"

    # 检测 pm2 是否安装
    echo "检测 pm2 是否安装..."
    ssh $REMOTE_HOST "if ! command -v pm2 &> /dev/null; then
        echo 'pm2 未安装，开始安装...'
        npm install pm2 -g
    fi"

    # # 在远程服务器上执行部署命令
    echo "在远程服务器上执行部署..."
    ssh $REMOTE_HOST "cd /root && \
        cd ${REMOTE_PATH} && \
        rm -rf ${REMOTE_PATH}/dist && \
        unzip $DIST_ZIP -d ${REMOTE_PATH} && \
        rm -rf $DIST_ZIP && \
        if pm2 list | grep -q 'e-recycle-server'; then
            pm2 restart ecosystem.config.js
        else
            pm2 start ecosystem.config.js
        fi && \
        pm2 list"
    
    # 清理本地临时文件
    echo "清理本地临时文件..."
    rm -rf ./$DIST_ZIP
    
    echo "部署完成"
}

# 根据参数执行相应的操作
case "$1" in
    -h|--help)
        show_help
        ;;
    -b|--build)
        build
        ;;
    -d|--deploy)
        deploy
        ;;
    *)
        build
        deploy
        ;;
esac