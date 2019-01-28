(function () {
    'use strict';

    const gulp = require('gulp');
    const semver = require('semver');

    const minNodeVersion = '>=10.0.0';
    if (!semver.satisfies(process.version, minNodeVersion)) {
        throw new Error(
            'Ошибка версии Node.js, минимальная версия ' + minNodeVersion +
            ', текущая версия ' + process.version
        );
    }

    process.env.NODE_ENV = 'development'; // development production

    global.APPS_NAMES = [
        'Login',
        'Landing',
        'Administration'
    ];
    global.TARGET_FOLDER = 'target/masterdata-web-admin';

    const options = {
        DEBUG: true,
        RELEASE: false
    };

    const registerTask = require('./gulptasks/00.apps');
    const appsName = global.APPS_NAMES;
    for (let i = 0; i < appsName.length; i += 1) {
        registerTask(appsName[i], options);
    }

    require('./gulptasks/10.core');
    require('./gulptasks/80.dev');
    require('./gulptasks/90.browsersync');

    function runTasks() {
        for (let i = 0; i < appsName.length; i += 1) {
            registerTask(appsName[i], options);
        }

        global.APPS_NAMES.map(function (name) {
            gulp.start(name + '-min-All');
        })
    }

    gulp.task('test', function () {
        const mocha = require('gulp-mocha');

        return gulp.src(
            [`test/units/**/*.ts`],
            { read: false }
        )
            .pipe(mocha({
                reporter: 'spec',
                require: [
                    'ts-node/register'
                ]
            }));
    });

    gulp.task(
        'debug',
        function () {
            options.DEBUG = true;
            options.RELEASE = false;
            process.env.NODE_ENV = 'development';
            runTasks();
        }
    );

    gulp.task(
        'release',
        function () {
            options.DEBUG = false;
            options.RELEASE = true;
            process.env.NODE_ENV = 'production';
            runTasks();
        }
    );

    gulp.task('default', ['release']);
}());