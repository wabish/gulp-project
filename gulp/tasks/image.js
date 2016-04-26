module.exports = function (gulp, plugins, config) {
    // 自动雪碧图
    gulp.task('autoSprite', function() {
        return gulp.src(config.src + 'css/mod/*.css')
            .pipe(plugins.cssSpritesmith({
                imagepath: config.src + 'images/mod',
                spritedest: 'images/mod',
                spritepath: '../../images/mod',
                padding: 2
            }))
            .pipe(gulp.dest(config.tmp));
    });

    // 复制图片到tmp临时目录
    gulp.task('copy:img', function() {
        return gulp.src(config.src + 'images/app/**/*.{png,gif,jpg,jpeg}')
            .pipe(plugins.contribCopy())
            .pipe(gulp.dest(config.tmp + 'images/app'));
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
        return gulp.src(config.tmp + 'images/**/*.{png,gif,jpg,jpeg}')
            .pipe(plugins.rev())
            .pipe(gulp.dest(config.dist + 'images'))
            .pipe(plugins.rev.manifest())
            .pipe(gulp.dest(config.tmp + 'rev/images'));
    });
};
