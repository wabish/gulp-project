var gulp = require('gulp');

// 顺序执行任务插件
var runSequence = require('run-sequence');

// 自动刷新浏览器工具
var browserSync = require('browser-sync').create();

// 配置文件
var config = require('./gulp/config')();

// 加载插件
var plugins = require('gulp-load-plugins')();

// 子任务列表
var gulpTaskList = require('fs').readdirSync(config.task);

// 遍历子任务
gulpTaskList.forEach(function(taskfile) {
    require(config.task + taskfile)(gulp, plugins, config, browserSync);
});

// 说明帮助
gulp.task('help',function () {
    console.log('******************************************************');
    console.log('*                                                    *');
    console.log('*   gulp help        说明帮助                        *');
    console.log('*   gulp sass        sass本地编译                    *');
    console.log('*   gulp jshint      js语法检测                      *');
    console.log('*   gulp include     html包含依赖编译                *');
    console.log('*   gulp dev         开发监控，浏览器不自动刷新      *');
    console.log('*   gulp serve       开发监控，浏览器自动刷新        *');
    console.log('*   gulp build       打包上线                        *');
    console.log('*                                                    *');
    console.log('******************************************************');
});

// 开发监控，浏览器不自动刷新
gulp.task('dev', function(cb) {
    runSequence(
        'clean:dist',
        'clean:tmp',
        ['copy:img', 'sass', 'jshint', 'copy:js', 'include'],
        'watch',
        cb
    );
});

// 开发监控，浏览器自动刷新
gulp.task('serve', function(cb) {
    runSequence(
        'clean:dist',
        'clean:tmp',
        ['copy:img', 'sass', 'jshint', 'copy:js', 'include'],
        'reload',
        cb
    );
});

// 打包上线
gulp.task('build', function(cb) {
    runSequence(
        'clean:dist',
        'clean:tmp',
        'build:img',
        'build:css',
        'build:js',
        'build:html',
        'clean:tmp',
        cb
    );
});
