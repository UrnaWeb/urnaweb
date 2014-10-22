var gulp        = require('gulp'),
    usemin      = require('gulp-usemin'),
    rev         = require('gulp-rev'),
    minifyHtml  = require('gulp-minify-html'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    csso        = require('gulp-csso'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    livereload  = require('gulp-livereload'),
    neat        = require('node-neat').includePaths,
    ngAnnotate  = require('gulp-ng-annotate'),
    connect     = require('gulp-connect'),
    changed     = require('gulp-changed'),
    imagemin    = require('gulp-imagemin'),
    clean       = require('gulp-clean'),
    jsonminify  = require('gulp-jsonminify');

gulp.task('build-sass', function() {
  return gulp.src('stylesheet/**/*.scss')
    .pipe(
      sass( {
        includePaths: ['stylesheet'].concat(neat),
        errLogToConsole: true
      }))
    .pipe( gulp.dest('tmp') )
});

// =====================================================================================
//  Development related tasks
// =====================================================================================
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});
gulp.task('reload-css', function () {
  gulp.src('./tmp/*.css')
    .pipe(connect.reload());
});
gulp.task('reload-html', function () {
  gulp.src('./**/*.html')
    .pipe(connect.reload());
});
gulp.task('reload-js', function () {
  gulp.src('./javascript/**/*.js')
    .pipe(connect.reload());
});
gulp.task('watch', function () {
    gulp.watch(['./stylesheet/**/*.scss'],['build-sass']);
    gulp.watch(['tmp/*.css'],['reload-css']);
    gulp.watch('javascript/**/*.js',['reload-js']);
    gulp.watch(['index.html','templates/**/*.html'],['reload-html']);
});

// =====================================================================================
//  Production related tasks
// =====================================================================================
gulp.task('move', function(){
  gulp.src(['./images/*.svg','./urna.mp3'], { base: './' })
  .pipe(gulp.dest('dist'));
});
gulp.task('image-compress', function() {
  return gulp.src(['./images/*.png','./images/*.jpg','./images/*.jpeg','./images/*.gif'])
      .pipe(changed('./dist/images'))
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/images'))
});
gulp.task('build-html', function() {
  gulp.src(['./templates/*.html','./templates/**/*.html','./templates/**/**/*.html'])
    .pipe(minifyHtml({empty: true}))
    .pipe(gulp.dest('./dist/templates'))
});
gulp.task('build-json', function () {
    gulp.src(['languages/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('./dist/languages'));
});
gulp.task('usemin', function() {
  gulp.src('index.html')
    .pipe(usemin({
      html: [minifyHtml({empty: true})],
      css: [csso(), rev()],
      js: [ngAnnotate(), uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

// =====================================================================================
//  Main tasks registration
// =====================================================================================
gulp.task('clean', function(){
  return gulp.src(['dist/*'], {read:false})
  .pipe(clean());
});
gulp.task('default', ['connect','watch']);
gulp.task('build', ['build-sass','move','image-compress','build-json','build-html','usemin']);