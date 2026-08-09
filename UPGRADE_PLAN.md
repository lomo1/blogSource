# Hexo 博客升级计划

## 当前版本
- Hexo: 6.1.0
- Node.js: 24.19.0
- Gulp: 3.9.1

## 升级路径

### 🔵 阶段 1：升级 Hexo 核心和插件（推荐先执行）

```bash
# 升级 Hexo 到最新 8.x
npm install hexo@^8.1.2

# 升级所有 Hexo 插件到兼容版本
npm install \
  hexo-cli@^4.3.2 \
  hexo-deployer-git@^4.0.0 \
  hexo-generator-archive@^2.0.0 \
  hexo-generator-category@^2.0.0 \
  hexo-generator-feed@^4.0.0 \
  hexo-generator-index@^4.0.0 \
  hexo-generator-tag@^2.0.0 \
  hexo-renderer-marked@^7.0.1 \
  hexo-renderer-stylus@^3.0.1 \
  hexo-server@^3.0.0

# 测试基本功能
npm run clean
hexo generate
hexo server
```

**潜在问题**：
- Hexo 8 可能对某些插件 API 有变化
- jacman 主题需要验证兼容性

---

### 🟢 阶段 2：现代化构建工具（Gulp 3 → 5）

Gulp 3.x 使用已弃用的 API，建议迁移到 Gulp 5：

```bash
# 升级 Gulp 和相关插件
npm install --save-dev \
  gulp@^5.0.1 \
  browser-sync@^3.0.4 \
  gulp-livereload@^4.0.2 \
  run-sequence@^2.2.1

# 更新压缩插件
npm install \
  gulp-htmlmin@^5.0.1 \
  gulp-imagemin@^9.2.0 \
  gulp-uglify@^3.0.2
```

**需要修改 gulpfile.js**：
- Gulp 4+ 移除了 `gulp.task()` 的三参数形式
- 需要使用 `gulp.series()` 和 `gulp.parallel()` 替代 `run-sequence`
- 参考：[Gulp 4 迁移指南](https://github.com/gulpjs/gulp/blob/master/docs/getting-started/quick-start.md)

---

### 🟡 阶段 3：优化和清理

```bash
# 移除过时的 resolutions 配置
# 编辑 package.json，删除：
# "resolutions": {
#   "graceful-fs": "4.2.3"
# }

# 删除不再需要的 preinstall 脚本
# "scripts": {
#   "preinstall": "npx npm-force-resolutions"  <-- 删除这行
# }
```

---

## 📋 详细步骤

### 快速方案（仅升级 Hexo）

```bash
# 1. 备份
git checkout -b upgrade-hexo

# 2. 升级 Hexo 和插件
npm install hexo@^8.1.2 \
  hexo-deployer-git@^4.0.0 \
  hexo-generator-archive@^2.0.0 \
  hexo-generator-category@^2.0.0 \
  hexo-generator-feed@^4.0.0 \
  hexo-generator-index@^4.0.0 \
  hexo-generator-tag@^2.0.0 \
  hexo-renderer-marked@^7.0.1 \
  hexo-renderer-stylus@^3.0.1

# 3. 测试
hexo clean
hexo generate
hexo server

# 4. 构建并检查输出
hexo generate
# 检查 public/ 目录内容

# 5. 如果一切正常，提交
git add package*.json
git commit -m "chore: upgrade Hexo to 8.x and plugins"
```

### 完整方案（包括 Gulp）

需要重写 `gulpfile.js` 以适配 Gulp 5。这是一个新的 Gulp 5 兼容版本：

```javascript
// gulpfile.js (Gulp 5 版本)
const { src, dest, series, parallel, watch } = require('gulp');
const shell = require('gulp-shell');
const cleanCSS = require('gulp-clean-css');  // 替代 gulp-minify-css
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const removeEmptyLines = require('gulp-remove-empty-lines');
const htmlclean = require('gulp-htmlclean');
const imagemin = require('gulp-imagemin');

// 任务定义
const clean = shell.task([
    'echo "====== 开始清除本地旧的文件📃 及其文件夹📂 ... =======" ',
    'hexo clean'
]);

const compile = shell.task([
    'echo "====== 重新生成新的博客相关资源文件📃 ... =======" ',
    'hexo generate'
]);

const startServer = shell.task([
    'echo "====== 开启本地服务Server并自动打开浏览器 ... =======" ',
    'hexo s -o'
]);

const deploy = shell.task([
    'echo "====== 开始自动部署博客资源文件到GitHubPages ... =======" ',
    'hexo deploy'
]);

// 压缩任务
function minifyCss() {
    console.log("====== 开始自动压缩CSS资源文件... ... =======");
    return src('./public/**/*.css')
        .pipe(cleanCSS())
        .pipe(dest('./public'));
}

function minifyHtml() {
    console.log("====== 开始自动压缩HTML资源文件... ... =======");
    return src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(removeEmptyLines())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
            removeEmptyAttributes: true,
            collapseWhitespace: true
        }))
        .pipe(dest('./public'));
}

function minifyJS() {
    console.log("====== 开始自动压缩JavaScript资源文件... ... =======");
    return src('./public/**/*.js')
        .pipe(uglify())
        .pipe(dest('./public'));
}

function minifyImages() {
    console.log("====== 开始自动压缩图片资源文件... ... =======");
    return src('./public/img/**/*.*')
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: false,
            multipass: false,
        }))
        .pipe(dest('./public/img'));
}

// 监听文件变化
function watchFiles() {
    watch('./source/**/*', series(compile, parallel(minifyCss, minifyHtml, minifyJS, minifyImages)));
}

// 导出任务
exports.clean = clean;
exports.compile = compile;
exports.startServer = startServer;
exports.deploy = deploy;
exports.minifyCss = minifyCss;
exports.minifyHtml = minifyHtml;
exports.minifyJS = minifyJS;
exports.minifyImages = minifyImages;

// 完整构建流程
exports.build = series(
    clean,
    compile,
    parallel(minifyCss, minifyHtml, minifyJS, minifyImages)
);

// 默认任务：构建 + 启动服务器 + 监听
exports.default = series(
    exports.build,
    parallel(startServer, watchFiles)
);
```

---

## ⚠️ 注意事项

1. **主题兼容性**：jacman 主题可能需要检查是否兼容 Hexo 8
2. **配置文件**：Hexo 8 对 `_config.yml` 的某些配置项有变化
3. **插件兼容性**：部分自定义插件可能需要更新
4. **测试部署**：建议先在本地完全测试后再部署

## 🧪 测试检查清单

- [ ] `hexo clean` 正常运行
- [ ] `hexo generate` 无错误
- [ ] `hexo server` 本地预览正常
- [ ] 所有文章页面显示正常
- [ ] RSS feed 生成正常
- [ ] Sitemap 生成正常
- [ ] 图片加载正常
- [ ] 样式无异常
- [ ] 部署到 GitHub Pages 成功

## 📚 参考资源

- [Hexo 8.0 发布说明](https://hexo.io/news/)
- [Gulp 5 迁移指南](https://gulpjs.com/docs/en/getting-started/quick-start)
- [Node.js 24 兼容性](https://nodejs.org/en/blog/release/)
