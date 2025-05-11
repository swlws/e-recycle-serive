#!/bin/bash

# 定义远程服务器信息
REMOTE_HOST="root@47.95.159.234"
REMOTE_PATH="/root/swlws/e-recycle-server"
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
    zip -r $DIST_ZIP ./dist
    echo "打包完成"
}

# 部署函数
deploy() {
    echo "开始部署..."
    
    # 上传dist.zip到远程服务器
    echo "上传文件到远程服务器..."
    scp ./$DIST_ZIP $REMOTE_HOST:/root/$DIST_ZIP
    if [ $? -ne 0 ]; then
        echo "文件上传失败"
        exit 1
    fi

    # 检测 pm2 是否安装
    echo "检测 pm2 是否安装..."
    ssh $REMOTE_HOST "if ! command -v pm2 &> /dev/null; then
        echo 'pm2 未安装，开始安装...'
        npm install pm2 -g
    fi"

    # 上传 ecosystem.config.json package.json到远程服务器
    echo "上传 ecosystem.config.json package.json 到远程服务器..."
    scp./ecosystem.config.json $REMOTE_HOST:$REMOTE_PATH/ecosystem.config.json
    scp ./package.json $REMOTE_HOST:$REMOTE_PATH/package.json
    if [ $? -ne 0 ]; then
        echo "文件上传失败"
        exit 1
    fi

    # 在远程服务器上执行部署命令
    echo "在远程服务器上执行部署..."
    ssh $REMOTE_HOST "cd /root && \
        mkdir -p ${REMOTE_PATH} && \
        if [ ! -d ${REMOTE_PATH}/node_modules ]; then
            cd ${REMOTE_PATH} && \
            npm install
        fi && \
        rm -rf ${REMOTE_PATH}/dist* && \
        unzip $DIST_ZIP -d ${REMOTE_PATH} && \
        rm -rf $DIST_ZIP && \
        pm2 restart all && \
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