/* eslint-disable strict */

'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const del = require('del');
const rollup = require('gulp-better-rollup');
const browserSync = require('browser-sync').create();

const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('styles', () => {
  return gulp
    .src('src/sass/style.scss')
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(isDevelopment, sourcemaps.write('')))
    .pipe(gulp.dest('build/css'));
});

gulp.task('js', () => {
  return gulp
    .src('src/js/main.js')
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    .pipe(rollup({}, 'iife'))
    .pipe(gulpif(isDevelopment, sourcemaps.write('')))
    .pipe(gulp.dest('build/js'));
});

gulp.task('html', () => {
  return gulp.src('src/*.html').pipe(gulp.dest('build'));
});

gulp.task('image', () => {
  return gulp
    .src('src/img/**/*.{png,jpeg,jpg,gif,svg}')
    .pipe(gulp.dest('build/img'));
});

gulp.task('fonts', () => {
  return gulp.src('src/fonts/**/*.*').pipe(gulp.dest('build/fonts'));
});

gulp.task('clean', () => {
  return del('build');
});

gulp.task(
  'build',
  gulp.series('clean', gulp.parallel('html', 'styles', 'js', 'image', 'fonts'))
);

gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.*', gulp.series('styles'));
  gulp.watch('src/*.html', gulp.series('html'));
  gulp.watch('src/js/**/*.*', gulp.series('js'));
  gulp.watch('src/img/**/*.{png,jpeg,jpg,gif,svg}', gulp.series('image'));
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  });
  browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));
