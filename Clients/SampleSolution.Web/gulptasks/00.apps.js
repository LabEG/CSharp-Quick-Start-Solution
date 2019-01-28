// Include gulp
const gulp = require('gulp');

// node
const fs = require('fs');

// main
const replace = require('gulp-replace');
const livereload = require('gulp-livereload');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const size = require('gulp-size');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const notify = require('gulp-notify');
const preprocess = require('gulp-preprocess');
const path = require('path');
const gulpif = require('gulp-if');

// css, less
const csscomb = require('gulp-csscomb');
const csslint = require('gulp-csslint');
const lessify = require('node-lessify');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const autoprefix = new LessPluginAutoPrefix({browsers: ["last 4 versions"]});

// ts
const browserify = require('browserify');
const watchify = require('watchify');
const gulpTslint = require("gulp-tslint");
const tslint = require("tslint");
const stringify = require('stringify');
const uglify = require('gulp-uglify');

// html, jsp
const htmlmin = require('gulp-htmlmin');
const htmlhint = require('gulp-htmlhint');

const mocha = require('gulp-mocha');

function registerTask(appName, options) {
    const appNameLC = appName.toLowerCase();

    /**
     * Code Style
     */

    gulp.task(
        appName + '-CS-LESS',
        function () {
            const pathToCSSAll = 'wwwrootsrc/' + appNameLC + '/**/*.{css,less}';
            return gulp.src(pathToCSSAll)
                .pipe(csslint())
                .pipe(csscomb())
                .pipe(gulp.dest('wwwrootsrc/' + appNameLC + '/'));
        }
    );

    gulp.task(
        appName + '-CS-TS',
        function () {
            const pathToJSAll = './wwwrootsrc/' + appNameLC + '/**/*.{ts,tsx}';

            return gulp.src(pathToJSAll)
                .pipe(gulpTslint({
                    formatter: "msbuild",
                    configuration: "tslint.json"
                }))
                .pipe(gulpTslint.report(
                    {
                        emitError: false,
                        summarizeFailureOutput: true
                    })
                );
        }
    );

    gulp.task(
        appName + '-CS-JSP',
        function () {
            const pathToJSPAll = [
                'wwwrootsrc/' + appNameLC + '.html'
            ];
            return gulp.src(pathToJSPAll)
                .pipe(htmlhint({'spec-char-escape': false, 'doctype-first': false}))
                .pipe(htmlhint.reporter());
        }
    );

    gulp.task(
        appName + '-CS-All',
        [
            appName + '-CS-LESS',
            appName + '-CS-TS',
            appName + '-CS-HTML,JSP'
        ]
    );

    /**
     * Minification
     */

    gulp.task(
        appName + '-min-IMG',
        function () {
            const pathToImg = 'wwwrootsrc/' + appNameLC + '/content/**/*.{jpg,gif,png,ico,json,svg}';
            return gulp.src(pathToImg)
                .pipe(plumber())
                .pipe(gulp.dest('wwwroot/' + appNameLC + '/content/'));
        }
    );

    let watchJS = false;
    let startTime = Date.now();
    const minifyJS = function (b) {
        gulp.start(appName + '-min-HTML');

        b.bundle()
            .on('error', function (err) {
                console.error(`Error in Browserify from app ${appName}: \n`, err.message);
                this.emit('end');
            })
            .pipe(plumber())
            .pipe(source('bundled.js'))
            .pipe(buffer())
            .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
            .pipe(rename({basename: 'main', suffix: '.min'}))
            .pipe(size({title: 'JS Size: '}))
            .pipe(gulp.dest('wwwroot/' + appNameLC + '/scripts/'))
            .pipe(notify({
                title: appName + ':',
                message: appName + '-min-TS: ' + ((Date.now() - startTime) / 1000) + ' s'
            }))
            .pipe(livereload());
    };

    gulp.task(
        appName + '-min-TS',
        function () {

            const pathToJSApp = 'wwwrootsrc/' + appNameLC + '/scripts/Main.ts';

            let b = browserify(
                {
                    cache: {},
                    packageCache: {},
                    fullPaths: process.env.NODE_ENV === 'development' || watchJS
                }
            )
                .plugin(
                    'tsify'
                )
                .transform(lessify,
                    {
                        textMode: true,
                        compileOptions: {
                            plugins: [autoprefix]
                        }
                    }
                )
                .transform(
                    stringify(
                        {
                            extensions: ['.txt', '.html'],
                            minify: true,
                            minifier: {
                                extensions: ['.html'],
                                options: {
                                    // html-minifier options
                                }
                            }
                        }
                    )
                )
                .transform(
                    'uglifyify',
                    {
                        global: true
                    }
                )
                .add(pathToJSApp);

            if (watchJS) {
                // if watch is enable, wrap this bundle inside watchify
                b = watchify(
                    b,
                    {
                        delay: 0,
                        ignoreWatch: true,
                        poll: 1000
                    }
                );
                b.on(
                    'update',
                    function () {
                        startTime = Date.now();
                        minifyJS(b);
                    }
                );
            }

            minifyJS(b);
        }
    );

    gulp.task(
        appName + '-min-HTML',
        function () {
            const pathToJSPApp = 'wwwrootsrc/' + appNameLC + '/index.html';
            return gulp.src(pathToJSPApp)
                .pipe(plumber())
                .pipe(preprocess(
                    {
                        context: {
                            DEBUG: global.DEBUG,
                            THEME: global.THEME
                        }
                    }
                ))
                .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
                .pipe(replace(/\{_date_\}/g, new Date().getTime()))
                .pipe(size({title: 'JSP Size: '}))
                .pipe(gulp.dest('wwwroot/' + appNameLC + '/'));
        }
    );

    gulp.task(
        appName + '-min-All',
        [
            appName + '-min-TS',
            appName + '-min-HTML',
            appName + '-min-IMG'
        ]
    );

    // Watchers
    gulp.task(
        appName + '-Watch-Min',
        [appName + '-min-All'],
        function () {
            livereload.listen();
            gulp.watch('wwwrootsrc/**/*.html', [appName + '-min-HTML']);

            watchJS = true;
            gulp.start(appName + '-min-TS');
        }
    );

}

module.exports = registerTask;