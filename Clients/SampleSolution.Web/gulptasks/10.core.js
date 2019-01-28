/**
 * Created by labutineg on 12.01.2015.
 *
 */

'use strict';

// Include gulp
const gulp = require('gulp');

const replace = require('gulp-replace');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const less = require('gulp-less');
const htmlmin = require('gulp-htmlmin');
const clean = require('gulp-clean');
const gulpSequence = require('gulp-sequence');

// Minification

const sceditorSourceFolder = 'src/main/webappsrc/clientapps/core/scripts/thirdparty/sceditor';

const taskList = [];

gulp.task('Core-clean', function () {
    return gulp.src('wwwroot/core/', {read: false})
        .pipe(clean());
});

gulp.task('Core-min-CoreJS-JS', function () {

    const pathToJS = [
        'node_modules/core-js/client/core.js',
        'node_modules/whatwg-fetch/fetch.js'
    ];

    return gulp.src(pathToJS)
        .pipe(concat('corejs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('wwwroot/core/scripts/'));
});
taskList.push('Core-min-CoreJS-JS');

gulp.task('Core-min-Static', function () {

    const pathToStatic = [
        'wwwrootsrc/**/*.{jpg,gif,png,otf,eot,ttf,woff,woff2,eof,svg,ico,json,swf}'
    ];

    return gulp.src(pathToStatic)
        .pipe(gulp.dest('wwwroot/'));
});
taskList.push('Core-min-Static');

gulp.task('Core-min-All', gulpSequence('Core-clean', taskList));
