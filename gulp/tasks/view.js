module.exports = function (gulp, plugins, config) {
    // html依赖替换
    gulp.task('include', function() {
        return gulp.src(config.dev + 'html/**/*.html')
            .pipe(plugins.includeHtml())
            .pipe(gulp.dest(config.dev + 'view'));
    });

    // 处理前替换
    gulp.task('replace:before', function() {
        return gulp.src(config.dev + 'view/mod/**/*.html')
            .pipe(plugins.replaceTask({
                prefix: '',
                patterns: [{
                    json: {
                        '__DEV__': '../../'
                    }
                }]
            }))
            .pipe(gulp.dest(config.tmp + 'view/mod'));
    });

    // 替换已经打包的静态资源
    gulp.task('usemin:html', function() {
        return gulp.src([
                config.tmp + 'rev/**/*.json',
                config.tmp + 'view/**/*.html'
            ])
            .pipe(plugins.revCollector())
            .pipe(gulp.dest(config.tmp + 'view'));
    });

    // 处理后替换
    gulp.task('replace:after', function() {
        return gulp.src(config.tmp + 'view/mod/**/*.html')
            .pipe(plugins.replaceTask({
                prefix: '',
                patterns: [{
                    json: {
                        '../../': '__DIST__'
                    }
                }]
            }))
            .pipe(gulp.dest(config.dist + 'view/mod'));
    });
};
