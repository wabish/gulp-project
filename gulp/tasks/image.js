module.exports = function (gulp, plugins, config) {
    // 自动雪碧图
    gulp.task('autoSprite', function() {
        return gulp.src(config.tmp + 'css/page/*.css')
            .pipe(plugins.cssSpritesmith({
                imagepath: config.tmp + 'images/sprite',
                spritedest: config.tmp + 'images/sprite',
                spritepath: '../../images/sprite',
                padding: 2
            }))
            .pipe(gulp.dest('./'));
    });

    // 复制图片到dist
    gulp.task('copy:img', function() {
        return gulp.src(config.src + 'images/**/*.{png,gif,jpg,jpeg}')
            .pipe(plugins.newer(config.dist + 'images'))
            .pipe(gulp.dest(config.dist + 'images'));
    });


    // 复制图片到tmp临时目录
    gulp.task('copy:tmpImg', function() {
        return gulp.src(config.src + 'images/**/*.{png,gif,jpg,jpeg}')
            .pipe(gulp.dest(config.tmp + 'images'));
    });

    // 压缩图片
    gulp.task('imagemin', function() {
        return gulp.src(config.tmp + 'images/**/*.{png,gif,jpg,jpeg}')
            .pipe(plugins.imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(config.tmp + 'images'));
    });

    // 添加图片版本号
    gulp.task('rev:img', function() {
        return gulp.src([
                config.tmp + 'images/**/*.{png,gif,jpg,jpeg}',
                '!' + config.tmp + 'images/sprite/*/*.{png,gif,jpg,jpeg}'
            ])
            .pipe(plugins.rev())
            .pipe(gulp.dest(config.dist + 'images'))
            .pipe(plugins.rev.manifest())
            .pipe(gulp.dest(config.tmp + 'rev/images'));
    });
};
