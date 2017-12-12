const gulp = require('gulp')
const clean = require('gulp-clean')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const queue = require('streamqueue')
const cssmin = require('gulp-cssmin')
const htmlmin = require('gulp-htmlmin')
const es = require('event-stream')
const rename = require('gulp-rename')
const runSequence = require('run-sequence')

gulp.task('clean', function(){
  return gulp.src('./dist')
   .pipe(clean())
})

gulp.task('app', function(){
  return gulp.src('./public/app/**/*.js')
    .pipe(concat('all.min.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
})

gulp.task('lib', function(){
  return queue({objectMode: true},
      gulp.src(['./public/lib/angular*.min.js', './public/lib/*/dist/**/*.min.js']),
      gulp.src('./public/lib/angular-locale-pt-br/angular-locale_pt-br.js').pipe(uglify())
    )
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('cssmin', function(){
  return es.merge([
    gulp.src('./public/lib/bootstrap/dist/css/bootstrap.min.css'),
    gulp.src('./public/app/**/*.css').pipe(cssmin())
  ])
  .pipe(concat('master.css'))
  .pipe(gulp.dest('./dist/'))

})

gulp.task('htmlmin', function(){
  return gulp.src('./public/app/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('copy', function(){
  return es.merge([
    gulp.src('./public/index-prod.html').pipe(rename('index.html')),
    gulp.src('./server-prod.js').pipe(rename('server.js'))
  ])
  .pipe(gulp.dest('./dist/'))
})

gulp.task('default', function(cb){
  runSequence('clean', ['app', 'lib', 'cssmin', 'htmlmin', 'copy'], cb)
})