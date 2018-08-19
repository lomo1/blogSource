var gulp = require('gulp');
var shell = require('gulp-shell');

var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var removeEmptyLines = require('gulp-remove-empty-lines');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');

var runSequence = require('run-sequence');

var Hexo = require('hexo');
var hexo = new Hexo(process.cwd(), {});

// Clean old files -- /public/*
gulp.task('clean', shell.task([
    'echo "====== 开始清除本地旧的文件📃 及其文件夹📂 ... =======" ',
    'hexo clean'
]));
// Generate new files -- /publick/*
gulp.task('compile', shell.task([
    'echo "====== 重新生成新的博客相关资源文件📃 ... =======" ',
    'hexo generate'
]));
// Start local server
gulp.task('startServer', shell.task([
    'echo "====== 开启本地服务Server并自动打开浏览器 ... =======" ',
    'hexo s -o'
]));
// Auto Deploy
gulp.task('deploy', shell.task([
    'echo "====== 开始自动部署博客资源文件到GitHubPages ... =======" ',
    'hexo deploy'
]));

// Compress CSS
gulp.task('minifyCss', function() {
    console.log("====== 开始自动压缩CSS资源文件... ... =======");
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});
// Compress HTML
gulp.task('minifyHtml', function() {
    console.log("====== 开始自动压缩HTML资源文件... ... =======");
    return gulp.src('./public/**/*.html')
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
        .pipe(gulp.dest('./public'));
});
// Compress JavaScript
gulp.task('minifyJS', function() {
    console.log("====== 开始自动压缩JavaScript资源文件... ... =======");
    return gulp.src('./public/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});
// Compress Image
gulp.task('minifyImages', function() {
    console.log("====== 开始自动压缩图片资源文件... ... =======");
    gulp.src('./public/img/**/*.*')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: false, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: false, //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('./public/img'));
});

// gulp.task('watch', function() {
//     gulp.watch('./source/**/*', function() {
//         console.log("====== 文件更新了... 重新build。。。 ======");
//         runSequence('clean', 'compile', 'minifyCss', 'minifyHtml', 'minifyJS', 'minifyImages');
//     });
// });

gulp.task('default', function() {
    runSequence('clean', 'compile', 'minifyCss', 'minifyHtml', 'minifyJS', 'minifyImages', 'startServer');
    gulp.watch('./source/**/*', function() {
        console.log("====== 文件更新了... 重新build。。。 ======");
        runSequence('compile', 'minifyCss', 'minifyHtml', 'minifyJS', 'minifyImages');
    });
});


// =============================================================================
// 
// =============================================================================

/**
 * Hexo 官方API
 * https://hexo.io/zh-cn/api/index.html
 * Deprecated
 */
gulp.task('cleans', function() {
    return hexo.init().then(function() {
        hexo.call('clean', {}).then(function() {
            return hexo.exit();
        }).catch(function(err) {
            return hexo.exit(err);
        });
    });
});

gulp.task('compiles', function() {
    return hexo.init().then(function() {
        hexo.call('generate', {}).then(function() {
            return hexo.exit();
            //hexo.call('server', {});
        }).catch(function(err) {
            return hexo.exit(err);
        });
    });

});