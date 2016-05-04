module.exports = function (gulp, plugins, config) {
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
};
