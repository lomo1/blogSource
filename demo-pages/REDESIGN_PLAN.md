# Demo 页面重新设计计划

## 🎯 设计目标

创建完整的、可对比的 Hexo 主题 demo 页面

---

## 📁 页面结构规划

### 1. 首页 (Index)
**文件名**:
- `demo-current-index.html` - 当前 Jacman 风格首页
- `demo-modern-index.html` - 现代化风格首页

**内容**:
- 文章列表（5-6篇）
- 每篇显示：标题、摘要、元信息、封面图（可选）
- 侧边栏：分类、标签、最新文章
- 分页导航

---

### 2. 文章详情页 (Post)
**文件名**:
- `demo-current-post.html` - 当前风格文章页
- `demo-modern-post.html` - 现代风格文章页

**内容**:
- 完整文章内容（包含代码、图片、引用等）
- 文章目录 (TOC)
- 上一篇/下一篇导航
- 标签列表
- 评论区（占位）
- 侧边栏（与首页一致）

---

### 3. 归档页 (Archive)
**文件名**:
- `demo-current-archive.html` - 当前风格归档
- `demo-modern-archive.html` - 现代风格归档

**内容**:
- 按年份 > 月份分组的文章列表
- 文章数量统计
- 侧边栏（与首页一致）

---

### 4. 分类页 (Category)
**文件名**:
- `demo-current-category.html` - 当前风格分类
- `demo-modern-category.html` - 现代风格分类

**内容**:
- 该分类下的文章列表
- 分类描述
- 文章数量
- 侧边栏（与首页一致）

---

## 🎨 统一规范

### 所有页面必须统一的元素：

#### Header（页头）
```
┌─────────────────────────────────────┐
│ Logo/站点名称         导航菜单      │
│ 副标题               (Home/About等) │
└─────────────────────────────────────┘
```

**包含**:
- 站点标题: "Lomo Space"
- 副标题: "The unexamined life is not worth living."
- 导航: Home, Essay, Read, Write, Code, Study, About
- 搜索框（可选）
- 暗色模式切换（仅现代版）

---

#### Sidebar（侧边栏）
```
┌──────────────────┐
│ 分类              │
│ - 技术 (45)       │
│ - 设计 (23)       │
│                   │
│ 标签云            │
│ [JS] [React]...   │
│                   │
│ 最新文章          │
│ - 文章1           │
│ - 文章2           │
└──────────────────┘
```

**包含**:
- 分类列表（带文章数）
- 标签云
- 最新文章（5篇）
- 友情链接（可选）

---

#### Footer（页脚）
```
┌─────────────────────────────────────┐
│     © 2026 Lomo Space               │
│     Powered by Hexo · Theme: Jacman │
│     GitHub | Twitter | RSS          │
└─────────────────────────────────────┘
```

**包含**:
- 版权信息
- 技术栈说明
- 社交链接
- 备案信息（可选）

---

## 🎨 设计规范

### 配色方案

#### 当前版本 (Jacman)
```css
主色: #2ca6cb (蓝色)
背景: #ddd (浅灰)
内容背景: #ffffff
文字: #413F3F
次要文字: #817C7C
边框: #ddd
```

#### 现代版本
```css
/* 浅色模式 */
主色: hsl(195, 69%, 48%)
背景: hsl(0, 0%, 98%)
内容背景: #ffffff
文字: hsl(0, 0%, 10%)
次要文字: hsl(0, 0%, 30%)
边框: hsl(0, 0%, 90%)

/* 暗色模式 */
主色: hsl(195, 85%, 60%)
背景: hsl(220, 15%, 10%)
内容背景: hsl(220, 15%, 14%)
文字: hsl(0, 0%, 95%)
次要文字: hsl(0, 0%, 75%)
边框: hsl(220, 15%, 25%)
```

---

### 排版规范

#### 当前版本
```css
基础字号: 16px
行高: 1.5
标题字号: 28px, 24px, 20px, 18px
字体: Helvetica Neue, Microsoft YaHei
```

#### 现代版本
```css
基础字号: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)
行高: 1.6
标题字号: 流式响应（clamp）
字体: -apple-system, BlinkMacSystemFont, Segoe UI
```

---

### 布局规范

#### 容器宽度
```css
最大宽度: 1200px
两栏比例: 主内容(70%) + 侧边栏(30%)
间距: 20px (当前) / var(--space-8) (现代)
```

#### 响应式断点
```css
手机: < 768px (单栏)
平板: 768px - 1024px
桌面: > 1024px
```

---

## 📝 示例内容

### 使用真实的博客文章
1. "Hexo 博客升级到 8.1.2 版本"
2. "现代 Web 设计趋势分析"
3. "JavaScript 异步编程最佳实践"
4. "React 18 新特性深度解析"
5. "CSS Grid 完全指南"

### 分类
- 技术 (45)
- 设计 (23)
- 随笔 (18)
- 读书 (12)

### 标签
JavaScript, React, Hexo, Node.js, CSS, Design, AI, Python

---

## ✅ 开发检查清单

每个页面完成后需要检查：

- [ ] Header 与其他页面完全一致
- [ ] Sidebar 与其他页面完全一致
- [ ] Footer 与其他页面完全一致
- [ ] 配色符合规范
- [ ] 字体、字号统一
- [ ] 间距、留白一致
- [ ] 响应式正常工作
- [ ] 暗色模式（现代版）正常
- [ ] 浏览器兼容性良好

---

## 🚀 开发顺序

1. **创建共享组件**
   - `_shared-current.css` - 当前版公共样式
   - `_shared-modern.css` - 现代版公共样式
   
2. **首页** (最重要)
   - demo-current-index.html
   - demo-modern-index.html

3. **文章详情页** (最复杂)
   - demo-current-post.html
   - demo-modern-post.html

4. **归档页**
   - demo-current-archive.html
   - demo-modern-archive.html

5. **分类页**
   - demo-current-category.html
   - demo-modern-category.html

---

## 📊 预期成果

### 文件列表
```
demo-pages/
├── README.md
├── assets/
│   ├── current-shared.css      # 当前版公共样式
│   └── modern-shared.css       # 现代版公共样式
├── demo-current-index.html     # 当前版首页
├── demo-modern-index.html      # 现代版首页
├── demo-current-post.html      # 当前版文章页
├── demo-modern-post.html       # 现代版文章页
├── demo-current-archive.html   # 当前版归档页
├── demo-modern-archive.html    # 现代版归档页
├── demo-current-category.html  # 当前版分类页
└── demo-modern-category.html   # 现代版分类页
```

### 对比方式
```
首页对比:   current-index.html   vs modern-index.html
文章对比:   current-post.html    vs modern-post.html
归档对比:   current-archive.html vs modern-archive.html
分类对比:   current-category.html vs modern-category.html
```

---

**创建时间**: 2026-08-09  
**状态**: 规划完成，准备重新开发
