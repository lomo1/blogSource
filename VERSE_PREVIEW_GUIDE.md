# Hexo Theme Verse - 预览指南

> 主题已安装到你的博客中，可以立即预览！

---

## 🚀 快速启动

### 方法一：使用启动脚本（推荐）

```bash
./start-verse.sh
```

### 方法二：手动启动

```bash
# 1. 清理缓存
npx hexo clean

# 2. 生成静态文件
npx hexo generate

# 3. 启动服务
npx hexo server
```

### 方法三：一行命令

```bash
npx hexo clean && npx hexo generate && npx hexo server
```

然后访问：**http://localhost:4000**

---

## 📁 已安装的文件

### 主题位置
```
themes/verse/          # Verse 主题目录
```

### 配置文件
```
_config.yml            # 站点配置（已修改 theme: verse）
```

---

## ⚙️ 自定义配置

### 1. 复制主题配置文件

```bash
cp themes/verse/_config.yml _config.verse.yml
```

### 2. 编辑主题配置

```bash
vim _config.verse.yml
```

### 3. 自定义导航菜单

在 `_config.verse.yml` 中修改：

```yaml
menu:
  首页: /
  归档: /archives
  分类: /categories
  标签: /tags
  关于: /about
```

### 4. 配置侧边栏

```yaml
sidebar:
  enable: true
  position: right  # left 或 right
  display: post    # always, post, page, hide

widgets:
  - category
  - tag
  - tagcloud
  - archive
  - recent_posts
```

### 5. 启用暗色模式

```yaml
dark_mode:
  enable: true
  default: auto  # auto, light, dark
```

---

## 📄 创建必要页面

### 关于页面

```bash
npx hexo new page about
```

编辑 `source/about/index.md`：

```yaml
---
title: 关于
layout: page
---

这里是关于页面的内容...
```

### 分类页面

```bash
npx hexo new page categories
```

编辑 `source/categories/index.md`：

```yaml
---
title: 分类
layout: category
---
```

### 标签页面

```bash
npx hexo new page tags
```

编辑 `source/tags/index.md`：

```yaml
---
title: 标签
layout: tag
---
```

---

## 📝 写文章

### 创建新文章

```bash
npx hexo new "文章标题"
```

### Front-matter 示例

```yaml
---
title: 我的第一篇文章
date: 2024-08-09 16:00:00
categories:
  - 技术
tags:
  - Hexo
  - 博客
---

文章内容...

<!-- more -->

更多内容...
```

---

## 🎨 主题特性预览

访问 http://localhost:4000 后，你可以看到：

### 首页
- ✅ 文章列表（卡片式）
- ✅ 侧边栏（分类、标签、最新文章等）
- ✅ 响应式布局
- ✅ 暗色模式切换按钮

### 文章详情页
- ✅ 文章内容
- ✅ 阅读进度条
- ✅ 目录导航
- ✅ 上一篇/下一篇导航
- ✅ 返回顶部按钮

### 归档页
- ✅ 按年月分组
- ✅ 文章列表

### 分类/标签页
- ✅ 文章筛选
- ✅ 列表展示

---

## 🌓 测试暗色模式

1. 点击顶部导航栏的月亮/太阳图标
2. 主题会自动切换
3. 刷新页面，设置会保持

---

## 📱 测试响应式

1. 缩小浏览器窗口
2. 查看移动端布局
3. 测试移动端菜单（汉堡图标）

---

## 🔧 故障排查

### 样式没有加载

```bash
# 清理缓存重新生成
npx hexo clean
npx hexo generate
```

### 主题不生效

检查 `_config.yml` 中：
```yaml
theme: verse  # 确保是 verse
```

### 页面 404

确保已创建对应的页面：
```bash
npx hexo new page about
npx hexo new page categories
npx hexo new page tags
```

---

## 📚 更多文档

- **主题文档**: `themes/verse/README.md`
- **中文文档**: `themes/verse/README_CN.md`
- **开发文档**: `themes/verse/DEVELOPMENT.md`
- **功能清单**: `themes/verse/CHECKLIST.md`

---

## 💡 提示

1. **首次预览** - 可能需要几秒钟生成静态文件
2. **修改配置后** - 重启服务器（Ctrl+C 停止，然后重新启动）
3. **修改样式后** - 需要重新生成（`npx hexo generate`）
4. **热更新** - 文章内容修改后会自动刷新

---

## 🎉 开始使用

现在你可以：

1. ✅ **启动服务** - `./start-verse.sh`
2. ✅ **访问博客** - http://localhost:4000
3. ✅ **查看效果** - 浏览各个页面
4. ✅ **自定义配置** - 修改 `_config.verse.yml`
5. ✅ **创建页面** - 关于、分类、标签页
6. ✅ **写文章** - 测试文章显示效果

享受你的新主题吧！🚀
