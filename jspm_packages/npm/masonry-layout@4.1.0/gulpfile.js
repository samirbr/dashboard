/* */ 
(function(process) {
  var fs = require('fs');
  var gulp = require('gulp');
  var rename = require('gulp-rename');
  var replace = require('gulp-replace');
  var jshint = require('gulp-jshint');
  gulp.task('hint-js', function() {
    return gulp.src('masonry.js').pipe(jshint()).pipe(jshint.reporter('default'));
  });
  gulp.task('hint-test', function() {
    return gulp.src('test/unit/*.js').pipe(jshint()).pipe(jshint.reporter('default'));
  });
  gulp.task('hint-task', function() {
    return gulp.src('gulpfile.js').pipe(jshint()).pipe(jshint.reporter('default'));
  });
  var jsonlint = require('gulp-json-lint');
  gulp.task('jsonlint', function() {
    return gulp.src('*.json').pipe(jsonlint()).pipe(jsonlint.report('verbose'));
  });
  gulp.task('hint', ['hint-js', 'hint-test', 'hint-task', 'jsonlint']);
  var reBannerComment = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
  function getBanner() {
    var src = fs.readFileSync('masonry.js', 'utf8');
    var matches = src.match(reBannerComment);
    var banner = matches[0].replace('Masonry', 'Masonry PACKAGED');
    return banner;
  }
  function addBanner(str) {
    return replace(/^/, str);
  }
  var rjsOptimize = require('gulp-requirejs-optimize');
  gulp.task('requirejs', function() {
    var banner = getBanner();
    return gulp.src('masonry.js').pipe(rjsOptimize({
      baseUrl: 'bower_components',
      optimize: 'none',
      include: ['jquery-bridget/jquery-bridget', 'masonry/masonry'],
      paths: {
        masonry: '../',
        jquery: 'empty:'
      }
    })).pipe(replace("'masonry/masonry',", '')).pipe(addBanner(banner)).pipe(rename('masonry.pkgd.js')).pipe(gulp.dest('dist'));
  });
  var uglify = require('gulp-uglify');
  gulp.task('uglify', ['requirejs'], function() {
    var banner = getBanner();
    gulp.src('dist/masonry.pkgd.js').pipe(uglify()).pipe(addBanner(banner)).pipe(rename('masonry.pkgd.min.js')).pipe(gulp.dest('dist'));
  });
  var minimist = require('minimist');
  var gutil = require('gulp-util');
  var chalk = require('chalk');
  gulp.task('version', function() {
    var args = minimist(process.argv.slice(3));
    var version = args.t;
    if (!version || !/^\d\.\d+\.\d+/.test(version)) {
      gutil.log('invalid version: ' + chalk.red(version));
      return;
    }
    gutil.log('ticking version to ' + chalk.green(version));
    gulp.src('masonry.js').pipe(replace(/Masonry v\d\.\d+\.\d+/, 'Masonry v' + version)).pipe(gulp.dest('.'));
    gulp.src(['package.json']).pipe(replace(/"version": "\d\.\d+\.\d+"/, '"version": "' + version + '"')).pipe(gulp.dest('.'));
    var minorVersion = version.match(/^\d\.\d+/)[0];
    gulp.src('README.md').pipe(replace(/masonry\-layout@\d\.\d+/g, 'masonry-layout@' + minorVersion)).pipe(gulp.dest('.'));
  });
  gulp.task('default', ['hint', 'uglify']);
})(require('process'));
