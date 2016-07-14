var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var size          = require('gulp-size');
var sourcemaps    = require('gulp-sourcemaps');
var gutil         = require('gulp-util');
var uglify        = require('gulp-uglify');


gulp.task('watch', function() {
  'use strict';
  // 启动服务   API: http://www.browsersync.io/docs/options/
  browserSync.init({
    server: {
      baseDir: './',                      // 配置目录
      directory: true                     // 是否显示文件目录
    },
    open: 'external',                       // 此配置 按照本地IP打开(需要连网)
    startPath: './',
    port: parseInt(Math.random() * 1000 + 1000, 10)
  });

  gulp.watch('assets/js/**/*.js', function() {
    browserSync.reload();
  });
  gulp.watch('assets/sass/**/*.scss', ['sass']);
  gulp.watch('assets/js/**/*.js', ['js']);
});


gulp.task('sass', function() {
  'use strict';
  return gulp.src('assets/sass/**/*.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['ios >= 6', 'android >= 4.0']
    }))
    // .pipe(sourcemaps.write())
    .pipe(size({title: 'styles', gzip: true}))
    .pipe(gulp.dest('assets/css/'))
    .pipe(browserSync.stream())
    .on('end', function() {
      gutil.log(gutil.colors.magenta('sass 编译完成'));
    });
});

gulp.task('js', function() {
  'use strict';
  return gulp.src(['./assets/js/**/*.js'])
    .pipe(uglify({
      output: {ascii_only: true},              // 将中文转为unicode编码
      compress: {drop_console: true}            // 扔掉console调试语句
    }))
    .pipe(gulp.dest('./assets/script/'));
});
