module.exports = function (gulp, plugins, config, browserSync) {
    // sass编译
    gulp.task('sass', function() {
        return gulp.src(config.src + 'sass/page/*.scss')
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({outputStyle: 'expanded'}).on('error', plugins.sass.logError))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(config.dist + 'css/page'))
            .pipe(browserSync.reload({stream: true}));
    });

    // sass编译到tmp
    gulp.task('sass:tmp', function() {
        return gulp.src(config.src + 'sass/page/*.scss')
            .pipe(plugins.sass({outputStyle: 'expanded'}).on('error', plugins.sass.logError))
            .pipe(gulp.dest(config.tmp + 'css/page'));
    });

    // 压缩css
    gulp.task('sass:dist', function() {
        return gulp.src(config.tmp + 'css/**/*.css')
            .pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
            .pipe(gulp.dest(config.tmp + 'css'));
    });

    // 替换已经打包的图片资源
    gulp.task('usemin:css', function() {
        return gulp.src([
                config.tmp + 'rev/**/*.json',
                config.tmp + 'css/**/*.css'
            ])
            .pipe(plugins.revCollector())
            .pipe(gulp.dest(config.tmp + 'css'));
    });

    // 添加css文件版本号
    gulp.task('rev:css', function() {
        return gulp.src(config.tmp + 'css/**/*.css')
            .pipe(plugins.rev())
            .pipe(gulp.dest(config.dist + 'css'))
            .pipe(plugins.rev.manifest())
            .pipe(gulp.dest(config.tmp + 'rev/css'));
    });
};
