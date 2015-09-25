'use strict';

require('coffee-script/register');

var path = require('path'),
    gulp = require('gulp'),
    jade = require('gulp-jade'),
    mocha = require('gulp-mocha');

gulp.task('templates', function() {
  gulp.src('./jade/*.jade')
    .pipe(jade({locals: {}}))
    .pipe(gulp.dest('./public'))
});

gulp.task('specs', function () {
    return gulp.src('spec/**/*', {read: false})
        .pipe(mocha({}));
});

gulp.task('watch', function() {
    gulp.watch('./jade/*.jade', ['templates']);
    gulp.watch('spec/**/*', ['specs']);
});

gulp.task('default', ["templates"]);

