var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %>',
  ' * @version <%= pkg.version %>',
  ' */',
  ''].join('\n');


gulp.task('default', function(){
  return gulp.src('src/social-share-links-counters.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(rename('social-share-links-counters.min.js'))
    .pipe(uglify())
    .pipe(header(banner, { pkg : pkg }))
    .pipe(gulp.dest('.'));
});
