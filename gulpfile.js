var gulp =require('gulp');
var sass=require('gulp-sass-china');

var hint=require('gulp-jshint');
var concat=require('gulp-concat');

var uglify=require('gulp-uglify');

var stylePath='./style/*.scss';
var scriptPath='./script/**/*.js';

var browserSync = require('browser-sync').create();

gulp.task('default',['script','style'],function(){
  browserSync.init({
    server:{
      baseDir:"./"
    }
  });

  gulp.watch(stylePath,['style']);
  gulp.watch(scriptPath,['script']);
});

gulp.task('style',function(){
  return gulp.src(stylePath)
    .pipe(sass())
    .pipe(gulp.dest('./dest'));

});


gulp.task('script',function(){
  return gulp.src(scriptPath)
        .pipe(hint())
        .pipe(hint.reporter('default'))
        .pipe(hint.reporter('fail'))
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dest'));
        //.pipe(browserSync,stream());
});


