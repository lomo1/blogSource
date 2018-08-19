var gulp = require('gulp');

var HEXO = require('./hexoAutoDoSth');

var livereload = require('gulp-livereload');

var browserSync = require('browser-sync').create();

// var runSequence = require('run-sequence');

var reload = browserSync.reload;

//定义多个单独任务

gulp.task('Clear', function() {
    console.log(" 开始清除本地旧的public文件...");
    HEXO.clear();
});

gulp.task('Generate', function() {
    console.log(" 重新生成本地静态文件[public] ...");
    HEXO.generate();
});

/**
 * Hexo 提供本地Server服务
 */
gulp.task('StartServer', function() {
    console.log(" 开启本地服务器...");
    HEXO.startServer();
});

gulp.task('Deploy', function() {
    console.log(" 开始将本地静态文件推送至远程服务器...");
    HEXO.deployTo();
});

/** Deprecated */
gulp.task('BrowserSync', function() {
    HEXO.browserSync(); //Todo
});

/** 监听public文件夹下的所有文件，一旦有变更立刻刷新页面展示最新修改效果 */
gulp.task('serve', function() {

    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });

    gulp.watch("**").on("change", function() {
        // runSequence('Clear', 'Generate');
        console.log("===-----重新生成了最新public了---======");
    }).on("change", reload);
});

// gulp.task('listen', function() {
//     gulp.watch("./public/*", function() {
//         console.log("public变化了.......!!!!!");
//     }).on("change", reload);
// });

//Gulp -- Default 方法
gulp.task('default', function() {
    gulp.run('Clear', 'Generate', 'StartServer', 'serve');

    gulp.watch("./source/*", function() {
        console.log("  Blog .md源文件已发生变更...即刻开始重新Build生成并更新页面内容...");
        gulp.run('Generate');

    });

    gulp.watch(['./themes/jacman/_config.yml', './themes/jacman/source', './themes/jacman/layout'], function() {
        console.log("  主题Themes相关配置源文件已发生变更...即刻开始重新Build生成并更新页面样式、内容...");
        gulp.run('Generate');
    });

    // gulp.watch("./public/*", function() {
    //     console.log("public变化了.......!!!!!");
    // }).on("change", reload);

});

// gulp.task('default', function() {
//     // runSequence('Clear', 'Generate', 'StartServer', 'serve');
//     // gulp.watch("./source/*", function() {
//     //     console.log("  Blog .md源文件已发生变更...即刻开始重新Build生成并更新页面内容...");
//     //     runSequence('Generate', 'listen');
//     // });
// });

gulp.task('help', function() {
    console.log("=========================Gulp Help Start==========================");
    console.log("   gulp Clear       ==> 清除本地已有静态文件和db.json文件    ");
    console.log("   gulp Generate    ==> 重新生成静态页面文件和db.json文件    ");
    console.log("   gulp StartServer ==> 启动Hexo提供的本地server服务，默认端口号为: 4000");
    console.log("   gulp Deploy      ==> 将最新生成的静态页面文件全部部署到远程Server    ");
    console.log("   gulp BrowserSync ==> 基于Browser-Sync的本地服务，默认端口号为: 3000[必须先生成静态文件]");
    console.log("   gulp  ==> 默认方法, 清理、生成最新文件、启动server、自动刷新、实时查看最新修改的内容、主题样式等");
    console.log("=========================Gulp Help Ending==========================")
});


/** 使用gulp-livereload 监控文件变化 */
// gulp.task('reload', function(){
//     // livereload.listen();
//     var server = livereload();
//     gulp.watch('source/_posts/*.md', function(file){
//         server.changed(file.path);
//         console.log("有文件变更了......");
//     });
// });
// gulp.task('reload', function(){
//     gulp.src('public/*').pipe(livereload());
// });
// gulp.task('reloadAuto', function(){
//     livereload.listen();
//     gulp.watch('public/*', ['reload']);
// });


/** 使用Browser-Sync 的Proxy 代理模式 */
// gulp.task('browser-sync-proxy', function(){
//     browserSync.init({
//         proxy: "http://localhost:4000"
//     });
// });
//需要task 顺序执行，尤其是保证Generate先生成，可以使用run-sequence, npm install --save-dev run-sequence

//本机apache根目录设置为: /Users/lomo/Sites/
//将Blog整个目录放入机器的Apache等服务目录下，不用hexo开启server，使用browser-sync启动并监听，当.md文件变化时，自动执行hexo g然后刷新页面