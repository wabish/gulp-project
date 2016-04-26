module.exports = function () {
    var config = {
        src: 'src/',            // 开发目录
        dist: 'dist/',          // 打包目录
        tmp: 'tmp/',            // 临时构建目录
        task: './gulp/tasks/',  // gulp任务目录

        // 域名
        proxy: 'http://cloud.xxx.com'
    };
    return config;
};
