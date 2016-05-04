module.exports = function (gulp, plugins, config) {
    // js检错
    gulp.task('jshint', function() {
        return gulp.src([
                config.src + 'js/**/*.js',
                '!' + config.src + 'js/lib/**/*.js'
            ])
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter());
    });

    // 打包依赖的js文件
    gulp.task('requirejs', function() {
        return gulp.src(config.src + 'js/page/*.js')
            .pipe(plugins.requirejsOptimize({
                mainConfigFile: config.src + 'js/config.js',
                //optimize: 'none',
                optimize: 'uglify2',
                exclude: [
                    'jquery',
                    'artTemplate'
                ]
            }))
            .pipe(gulp.dest(config.tmp + 'js/page'));
    });

    // 压缩config文件到tmp目录
    gulp.task('uglify:config', function() {
        return gulp.src(config.src + 'js/config.js')
            .pipe(plugins.uglify())
            .pipe(gulp.dest(config.tmp + 'js'));
    });

    // 添加js文件版本号
    gulp.task('rev:js', function() {
        return gulp.src(config.tmp + 'js/**/*.js')
            .pipe(plugins.rev())
            .pipe(gulp.dest(config.dist + 'js'))
            .pipe(plugins.rev.manifest())
            .pipe(gulp.dest(config.tmp + 'rev/js'));
    });

    // 复制js文件到dist目录
    gulp.task('copy:js', function() {
        return gulp.src(config.src + 'js/**/*.js')
            .pipe(plugins.newer(config.dist + 'js'))
            .pipe(plugins.contribCopy())
            .pipe(gulp.dest(config.dist + 'js'));
    });

    // 复制第三方js文件到dist目录
     gulp.task('copy:libJs', function() {
        return gulp.src(config.src + 'js/lib/**/*.js')
            .pipe(plugins.contribCopy())
            .pipe(gulp.dest(config.dist + 'js/lib'));
    });
};
