module.exports = function (gulp, plugins, config) {
    // requirejs配置
    var rjsConfig = {
        mainConfigFile: config.src + 'js/config.js',
        //optimize: 'none',
        optimize: 'uglify2',
        exclude: [
            'jquery',
            'artTemplate',
            'placeholder',
            'formValidator',
            'aes',
            'md5'
        ]
    };

    // js检错
    gulp.task('jshint', function() {
        return gulp.src([
                config.src + 'js/**/*.js',
                '!' + config.src + 'js/lib/**/*.js'
            ])
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter());
    });

    // active目录打包依赖的js文件
    gulp.task('requirejs:active', function() {
        return gulp.src(config.src + 'js/mod/active/*.js')
            .pipe(plugins.requirejsOptimize(rjsConfig))
            .pipe(gulp.dest(config.tmp + 'js/mod/active'));
    });

    // other目录打包依赖的js文件
    gulp.task('requirejs:other', function() {
        return gulp.src(config.src + 'js/mod/other/*.js')
            .pipe(plugins.requirejsOptimize(rjsConfig))
            .pipe(gulp.dest(config.tmp + 'js/mod/other'));
    });

    // pay目录打包依赖的js文件
    gulp.task('requirejs:pay', function() {
        return gulp.src(config.src + 'js/mod/pay/*.js')
            .pipe(plugins.requirejsOptimize(rjsConfig))
            .pipe(gulp.dest(config.tmp + 'js/mod/pay'));
    });

    // register目录打包依赖的js文件
    gulp.task('requirejs:register', function() {
        return gulp.src(config.src + 'js/mod/register/*.js')
            .pipe(plugins.requirejsOptimize(rjsConfig))
            .pipe(gulp.dest(config.tmp + 'js/mod/register'));
    });

    // 压缩config文件到tmp目录
    gulp.task('uglify:config', function() {
        return gulp.src(config.src + 'js/*.js')
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

    // 复制第三方js文件到dist目录
    gulp.task('copy:js', function() {
        // return gulp.src(config.src + 'js/lib/**/*.js')
        //     .pipe(plugins.contribCopy())
        //     .pipe(gulp.dest(config.dist + 'js/lib'));
        
        return gulp.src(config.src + 'js/**/*.js')
            .pipe(plugins.newer(config.dist + 'js'))
            .pipe(plugins.contribCopy())
            .pipe(gulp.dest(config.dist + 'js'));
    });
};
