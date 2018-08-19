---
title: gulp compress html/css/js
date: 2017-04-02 11:09:41
tags: gulp
categories: study
description: 利用Gulp自动构建打包压缩前端相关资源
---

## Gulp使用

### 安装
```bash
npm install gulp-cli -g
npm install gulp -D
```

安装完成后在项目根目录下创建`gulpfile.js`文件。此文件名不能修改！
`touch gulpfile.js`

gulp官方及Gulp插件：

https://gulpjs.com/plugins/


### 打包压缩示例

#### 项目结构

根目录结构
```bash
#> tree -L 1
├── README.md
├── Temp
├── app
├── bower.json
├── bower_components
├── build
├── data
├── gulpfile.js
├── node_modules
├── package.json
└── reportTemplates
```
源码目录结构：
```bash
# app> tree -L 2
├── 404.html
├── assets
│   ├── css
│   ├── images
│   └── js #包括：service、controller、directive等。
├── demo.html  #demo文件，忽略
├── editor.html
├── favicon.ico
├── index.html
├── reportdetails.html
├── reportdetails_nk.html #无用文件，忽略
├── reportlist.html
├── vendor #第三方
│   ├── css
│   ├── fonts
│   └── js
└── views #ng视图文件
    ├── content.html
    ├── footer.html
    ├── header_logo.html
    └── herosection.html
```

`gulpfile.js`文件📃：
```js
// =============================================================================
// Gulp Task Dependencies
// =============================================================================

var gulp = require('gulp');
var browserSync = require('browser-sync'); //local service
var reload = browserSync.create().reload;

var clean = require('gulp-clean'); //del file
var rev = require('gulp-rev'); //update version number , md5
var revCollector = require('gulp-rev-collector'); // deprecated

var wiredep = require('wiredep').stream;

/** update lib reference in HTML */
var inject = require('gulp-inject');
var series = require('stream-series');
var htmlReplace = require('gulp-html-replace');

/** Compress HTML */
var htmlmin = require('gulp-htmlmin');
var gulpRemoveHtml = require('gulp-remove-html');
var removeEmptyLines = require('gulp-remove-empty-lines');

/** Compress CSS */
var minify = require('gulp-minify-css'); //deprecated
var cleanCSS = require('gulp-clean-css'); //compress CSS

var eslint = require('gulp-eslint'); //check js
var jshint = require('gulp-jshint');

/** Compress JS */
var uglify = require('gulp-uglify'); //compress&ugly js

var rename = require('gulp-rename'); //rename files' name
var concat = require('gulp-concat'); //merge multi files

/** Compress Image */
var imagemin = require('gulp-imagemin'); //compress image

var runSequence = require('run-sequence');
// var gulpSequence = require('gulp-sequence');

/* 解决AngularJS 缩写写法 gulp打包压缩后JS报错问题 */
var ngAnnotate = require('gulp-ng-annotate');


// =============================================================================
// Gulp Task
// =============================================================================

var buildBasePath = 'build'; //build ouput files folder

// =======================================================================
// Local -- Preview Task, No Compress, No Package, No Mix...
// =======================================================================

gulp.task('cleanTemp', function() {
    return gulp.src('./Temp', { read: false })
        .pipe(clean());
});

/** Start Local Server */
gulp.task('start:local', function() {
    browserSync({
        open: true,
        port: '9000',
        proxy: 'http://localhost/sites/JDBToolsPlatform/ProcessQualityReport/Temp',
        https: false
    });

    gulp.watch('./app/**/*', ['copy:temp']);
    //gulp.watch('./Temp/*.html').on('change', reload);
});

/** Copy Original Files To Temp */
gulp.task('copy:temp', function() {
    return gulp.src('./app/**/*')
        .pipe(gulp.dest('./Temp'))
        .pipe(browserSync.reload({ stream: true })); //所有文件都会刷新;Todo
});

/** 将bower依赖自动注入HTML文件中 */
gulp.task('bowerInject', function() {
    return gulp.src('./app/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('./tmp'));
});

/** 本地测试组合任务 -- 无压缩、带注释 */
gulp.task('local', function() {
    runSequence('cleanTemp', 'copy:temp', 'start:local');
});


// =======================================================================
// Prod -- Local Preview Task, Compressed, Mixed, md5 ...
// =======================================================================


/** Clean The Whole build Folder */
gulp.task('cleanBuild', function() {
    return gulp.src(buildBasePath, { read: false })
        .pipe(clean());
});

/** Copy Vendor Lib Files To Prod */
gulp.task('copyVendor2prod', function() {
    return gulp.src('./app/vendor/**/*')
        .pipe(gulp.dest(buildBasePath + '/vendor'));
});

gulp.task('copyFavicon', function() {
    return gulp.src('./app/favicon.ico')
        .pipe(gulp.dest(buildBasePath));
});

/** 压缩HTML(先合并HTML中CSS/JS)*/
gulp.task('minifyHtml', function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML为一行
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp.src(buildBasePath + '/**/*.html')
        .pipe(gulpRemoveHtml()) //清除特定标签
        .pipe(removeEmptyLines())
        .pipe(removeEmptyLines({ removeComments: true })) //清除注释
        .pipe(htmlmin(options))
        .pipe(gulp.dest(buildBasePath))
        .pipe(browserSync.reload({ stream: true }));
});

/** 压缩CSS */
gulp.task('minifyCss', function() {
    return gulp.src('./app/assets/css/*.css')
        //.pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS({ debug: true }, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(concat('bundle.min.css')) //合并为一个文件
        //.pipe(rev()) //添加md5
        .pipe(gulp.dest(buildBasePath + '/assets/css'))
        .pipe(browserSync.reload({ stream: true }));
});

/** 压缩JS */
gulp.task('minifyjsmd5', function() {
    return gulp.src('./app/assets/**/*.js')
        //.pipe(concat('bundle.min.js')) //合并压缩后的js为一个文件
        //.pipe(uglify()) //压缩js到一行
        //.pipe(rev()) //文件名加MD5后缀
        .pipe(gulp.dest(buildBasePath + '/assets/'))
        .pipe(browserSync.reload({ stream: true })); //输出到js目录
});

gulp.task('minifyJS', function() {
    return gulp.src('./app/assets/js/**/*.js')
        .pipe(ngAnnotate())
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildBasePath + '/assets/js'));
});

/** 压缩图片 */
gulp.task('minifyImg', function() {
    return gulp.src('./app/assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(buildBasePath + '/assets/images'))
        .pipe(browserSync.reload({ stream: true }));
});

/** Start Build Server Preview */
gulp.task('start:build', function() {
    browserSync({
        open: true,
        port: '9001',
        proxy: 'http://localhost/sites/JDBToolsPlatform/ProcessQualityReport/' + buildBasePath,
        https: false,
    });
});

/**
 * 清除HTML中所有CSS JS引用
 * <!-- build:css -->
 *  ......
 * <!-- endbuild -->
 * <!-- build:js -->
 *  ......
 * <!-- endbuild -->
 */

//var autoInjectHTMLFiles = ['app/index.html', 'app/editor.html', 'app/reportdetails.html'];
gulp.task('autoInject', function() {
    return gulp.src('app/**/*.html')
        .pipe(htmlReplace({
            'css': './assets/css/bundle.min.css',
            'js': './assets/js/bundle.min.js'
        }))
        .pipe(gulp.dest(buildBasePath));
});

gulp.task('prod', function() {
    runSequence('cleanBuild', 'copyVendor2prod', 'copyFavicon', 'minifyJS', 'minifyCss', 'minifyImg', 'autoInject', 'minifyHtml', 'start:build');
});
```

`package.json`文件📃：
```json
{
  "name": "processqualityreport",
  "version": "1.0.0",
  "description": "xxxx质量分析",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "xx1",
    "报告",
    "分析"
  ],
  "author": "Lomo",
  "license": "ISC",
  "dependencies": {
    "bootstrap": "^3.3.7",
    "bower": "^1.8.0",
    "browser-sync": "^2.18.8",
    "browserify": "^14.3.0",
    "gulp": "^3.9.1",
    "gulp-clean": "^0.3.2",
    "gulp-clean-css": "^3.0.4",
    "gulp-concat": "^2.6.1",
    "gulp-eslint": "^3.0.0",
    "gulp-html-replace": "^1.6.2",
    "gulp-htmlmin": "^3.0.0",
    "gulp-imagemin": "^3.2.0",
    "gulp-jshint": "^2.0.4",
    "gulp-linker": "^0.1.7",
    "gulp-order": "^1.1.1",
    "gulp-remove-empty-lines": "0.0.8",
    "gulp-remove-html": "^1.3.0",
    "gulp-rename": "^1.2.2",
    "gulp-replace": "^0.5.4",
    "gulp-rev": "^7.1.2",
    "gulp-rev-collector": "^1.0.5",
    "gulp-sequence": "^0.4.6",
    "gulp-sync": "^0.1.4",
    "gulp-sync-task": "^1.0.3",
    "gulp-uglify": "^2.0.0",
    "jshint": "^2.9.4",
    "run-sequence": "^1.2.2",
    "wiredep": "^4.0.0"
  },
  "devDependencies": {
    "eslint": "^3.19.0",
    "eslint-config-standard": "^10.2.1",
    "eslint-plugin-angular": "^2.4.0",
    "eslint-plugin-promise": "^3.5.0",
    "eslint-plugin-standard": "^3.0.1",
    "gulp-html-replace": "^1.6.2",
    "gulp-inject": "^4.2.0",
    "gulp-minify-css": "^1.2.4",
    "gulp-ng-annotate": "^2.0.0",
    "gulp-replace": "^0.5.4",
    "stream-series": "^0.1.1"
  }
}

```

执行`gulp prod`产生线上部署所需文件

```bash
# build/assets> tree -L 2
├── css
│   └── bundle.min.css
├── images
│   ├── blog-placeholder-vertical.png
│   ├── hero-1.jpg
│   ├── hero-4.jpg
│   ├── image-in-content-1.jpg
│   ├── image-in-content-2.jpg
│   ├── jdb-zhifuhuanbifenxi.png
│   ├── jdb_blue_logo.png
│   ├── jdb_logo.png
│   ├── jdb_qa_process_intro--.png
│   ├── jdb_qa_process_intro.png
│   ├── jdb_qa_process_intro_backup.png
│   ├── jdb_qa_process_intro_nk.png
│   ├── login-background.jpg
│   └── placeholder.png
└── js
    └── bundle.min.js
```

将自定义的CSS以及JS等压缩混淆并各自合并为一个单独的文件。图片进行一定程度的压缩。

