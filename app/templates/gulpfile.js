'use strict';

require('coffee-script/register');

var path = require('path'),
    gulp = require('gulp'),
    webpack = require('gulp-webpack-build'),
    jade = require('gulp-jade'),
    mocha = require('gulp-mocha');

var src = './lib',
    dest = './public',
    webpackOptions = {
        debug: true,
        devtool: '#source-map',
        watchDelay: 200
    },
    webpackConfig = {
        useMemoryFs: true,
        progress: true
    },
    CONFIG_FILENAME = webpack.config.CONFIG_FILENAME;

gulp.task('webpack', [], function() {
    return gulp.src(path.join(path.join(src, '**', CONFIG_FILENAME)), { base: path.resolve(src) })
        .pipe(webpack.configure(webpackConfig))
        .pipe(webpack.overrides(webpackOptions))
        .pipe(webpack.compile())
        .pipe(webpack.format({
            version: false,
            timings: true
        }))
        .pipe(webpack.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(gulp.dest(dest));
});

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
    gulp.watch(path.join(src, '**/*.*')).on('change', function(event) {
        if (event.type === 'changed') {
            gulp.src(event.path, { base: path.resolve(src) })
                .pipe(webpack.closest(CONFIG_FILENAME))
                .pipe(webpack.configure(webpackConfig))
                .pipe(webpack.overrides(webpackOptions))
                .pipe(webpack.watch(function(err, stats) {
                    gulp.src(this.path, { base: this.base })
                        .pipe(webpack.proxy(err, stats))
                        .pipe(webpack.format({
                            verbose: true,
                            version: false
                        }))
                        .pipe(gulp.dest(dest));
                }));
        }
    });
});
