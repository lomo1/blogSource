# Hexo Theme Verse

> 一个简洁、现代、优雅的 Hexo 主题

[English](README.md)

## ✨ 特性

- 🎨 **现代设计** - 简洁优雅的 UI，卡片式布局
- 🌓 **暗色模式** - 内置暗色模式，支持自动检测
- 📱 **响应式** - 移动优先设计，适配所有设备
- ⚡ **快速** - 性能优化，最小化依赖
- 🎯 **SEO 友好** - Open Graph、结构化数据、站点地图支持
- 🔍 **搜索** - 支持本地搜索
- 💬 **评论** - 支持多种评论系统（Valine、Disqus、Utterances 等）
- 🏷️ **丰富小工具** - 分类、标签、标签云、归档、最新文章
- 📊 **统计分析** - 支持 Google Analytics、百度统计
- 🎨 **可定制** - 通过配置文件轻松定制
- 🌐 **国际化** - 多语言支持（English、简体中文、繁體中文）

## 📦 安装

### 方法一：npm（推荐）

```bash
cd your-hexo-site
npm install hexo-theme-verse
```

### 方法二：Git Clone

```bash
cd your-hexo-site
git clone https://github.com/yourusername/hexo-theme-verse.git themes/verse
```

## 🚀 使用

### 1. 启用主题

编辑站点的 `_config.yml`：

```yaml
theme: verse
```

### 2. 配置主题

将主题的 `_config.yml` 复制到站点根目录，命名为 `_config.verse.yml`：

```bash
cp themes/verse/_config.yml _config.verse.yml
```

然后编辑 `_config.verse.yml` 来自定义主题。

### 3. 创建页面

#### 关于页面

```bash
hexo new page about
```

编辑 `source/about/index.md` 并添加：

```yaml
---
title: 关于
layout: page
---

你的内容...
```

#### 分类页面

```bash
hexo new page categories
```

编辑 `source/categories/index.md`：

```yaml
---
title: 分类
layout: category
---
```

#### 标签页面

```bash
hexo new page tags
```

编辑 `source/tags/index.md`：

```yaml
---
title: 标签
layout: tag
---
```

### 4. 生成和运行

```bash
hexo clean
hexo generate
hexo server
```

访问 `http://localhost:4000`

## ⚙️ 配置

### 菜单导航

在 `_config.verse.yml` 中自定义导航菜单：

```yaml
menu:
  首页: /
  归档: /archives
  分类: /categories
  标签: /tags
  关于: /about
```

### 暗色模式

```yaml
dark_mode:
  enable: true
  default: auto  # auto, light, dark
```

### 侧边栏

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

### 评论系统

#### Valine

```yaml
comments:
  enable: true
  provider: valine

valine:
  appId: 你的-app-id
  appKey: 你的-app-key
  placeholder: "留下你的评论..."
```

#### Disqus

```yaml
comments:
  enable: true
  provider: disqus

disqus:
  shortname: 你的-disqus-shortname
```

#### Utterances

```yaml
comments:
  enable: true
  provider: utterances

utterances:
  repo: username/repo
  issue_term: pathname
  theme: github-light
```

### 统计分析

```yaml
# Google Analytics
google_analytics: UA-XXXXX-X

# 百度统计
baidu_analytics: 你的密钥
```

### 社交链接

```yaml
social:
  github: https://github.com/yourusername
  twitter: https://twitter.com/yourusername
  email: your@email.com
```

## 📝 写文章

### Front-matter

```yaml
---
title: 文章标题
date: 2024-01-01 12:00:00
updated: 2024-01-02 12:00:00
categories:
  - 分类
tags:
  - 标签1
  - 标签2
---

文章内容...
```

### 摘要

使用 `<!-- more -->` 创建摘要：

```markdown
这是摘要部分。

<!-- more -->

这是完整内容。
```

## 🎨 自定义

### 自定义 CSS

在主题目录创建 `source/css/_custom.styl`：

```stylus
// 你的自定义样式
.my-custom-class
  color: red
```

### 自定义 JavaScript

在主题目录创建 `source/js/custom.js`：

```javascript
// 你的自定义脚本
console.log('Hello Verse!');
```

## 🌐 多语言

支持的语言：

- English (en)
- 简体中文 (zh-CN)
- 繁體中文 (zh-TW)

在站点的 `_config.yml` 中设置语言：

```yaml
language: zh-CN
```

## 📄 许可证

[MIT License](LICENSE)

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

## 💖 支持

如果你喜欢这个主题，请在 [GitHub](https://github.com/yourusername/hexo-theme-verse) 上给它一个 ⭐️！

## 📮 联系方式

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your@email.com

## 📚 资源

- [Hexo 文档](https://hexo.io/zh-cn/docs/)
- [主题文档](https://github.com/yourusername/hexo-theme-verse/wiki)
- [问题追踪](https://github.com/yourusername/hexo-theme-verse/issues)
