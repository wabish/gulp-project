var runSequence = require('run-sequence');

module.exports = function (gulp, plugins, config, browserSync) {
    // 删除dist目录
    gulp.task('clean:dist', function() {
        return gulp.src(config.dist, {read: false})
            .pipe(plugins.clean());
    });

    // 删除tmp目录
    gulp.task('clean:tmp', function() {
        return gulp.src(config.tmp, {read: false})
            .pipe(plugins.clean());
    });

    // 开发监控，浏览器不自动刷新
    gulp.task('watch', function() {
        gulp.watch(config.src + 'sass/**/*.scss', ['sass']);
        gulp.watch(config.src + 'js/**/*.js', ['jshint', 'copy:js']);
        gulp.watch(config.src + 'images/**/*.{png,gif,jpg,jpeg}', ['copy:img']);
        gulp.watch(config.src + 'html/**/*.html', ['include']);
    });

    // 开发监控，浏览器自动刷新
    gulp.task('reload', function() {
        browserSync.init({
            server: {
                baseDir: './'
            }
        });

        gulp.watch(config.src + 'html/**/*.html', ['include']);
        gulp.watch(config.src + 'sass/**/*.scss', ['sass']);
        gulp.watch(config.src + 'js/**/*.js', ['jshint', 'copy:js']);
        gulp.watch(config.src + 'images/**/*.{png,gif,jpg,jpeg}', ['copy:img']);
        gulp.watch(config.dist + 'js/**/*.js').on('change', browserSync.reload);
    });

    // 打包图片
    gulp.task('build:img', function(cb) {
        runSequence(
            'sass:tmp',
            'copy:tmpImg',
            'autoSprite',
            'imagemin',
            'rev:img',
            cb
        );
    });

    // 打包css文件
    gulp.task('build:css', function(cb) {
        runSequence(
            'usemin:css',
            'sass:dist',
            'rev:css',
            cb
        );
    });

    // 打包js文件
    gulp.task('build:js', function(cb) {
        runSequence(
            'requirejs',
            'uglify:config',
            'rev:js',
            'copy:libJs',
            cb
        );
    });

    // 打包html文件
    gulp.task('build:html', function(cb) {
        runSequence(
            'include',
            'usemin:html',
            cb
        );
    });
};
