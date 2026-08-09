#!/bin/bash

# Hexo Theme Verse - 快速启动脚本

echo "🚀 启动 Hexo 博客预览..."
echo ""

# 清理缓存
echo "📦 清理缓存..."
npx hexo clean

# 生成静态文件
echo "🔨 生成静态文件..."
npx hexo generate

# 启动本地服务器
echo "🌐 启动本地服务器..."
echo ""
echo "✅ 博客预览地址: http://localhost:4000"
echo "✅ 按 Ctrl+C 停止服务"
echo ""

npx hexo server
