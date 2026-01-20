# 阶段 1: 构建依赖（builder）
FROM node:22-alpine AS builder

WORKDIR /app

# 先复制 package 文件，缓存依赖层（加速构建）
COPY package*.json ./

RUN npm ci --omit=dev   # 只装生产依赖，--omit=dev 更快更小

# 复制所有源代码
COPY . .

# 阶段 2: 运行阶段（最终瘦身镜像）
FROM node:22-alpine

# 创建非 root 用户（安全最佳实践）
RUN addgroup -g 1001 nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs

WORKDIR /app

# 从 builder 复制 node_modules 和代码（带权限）
COPY --from=builder --chown=nodeuser:nodejs /app /app

# 切换到非 root 用户运行
USER nodeuser

# 暴露端口（App Runner 默认检查 8080）
EXPOSE 8080

# 启动命令（用 npm start 更灵活，支持 package.json scripts）
CMD ["npm", "start"]