/**
 * Created by labutineg on 12.01.2015.
 *
 */
(function () {
    'use strict';

    // Include gulp
    const gulp = require('gulp');

    const exec = require('child_process').exec;

    gulp.task('Dev-Git-Status', function () {

        exec(
            'start \"Git status\" \"sh.exe\" --login -i \"gulptasks/shells/git-status.sh\"',
            function (err, data) {
                console.log(err);
                console.log(data.toString());
            }
        );

    });

    gulp.task('Dev-Git-AddCommit', function () {

        exec(
            'start \"Git commit\" \"sh.exe\" --login -i \"gulptasks/shells/git-commit.sh\"',
            function (err, data) {
                console.log(err);
                console.log(data.toString());
            }
        );

    });

    gulp.task('Dev-Git-AddCommitPullPush', function () {

        exec(
            'start \"Git commit\" \"sh.exe\" --login -i \"gulptasks/shells/git-commit,pull,push.sh\"',
            function (err, data) {
                console.log(err);
                console.log(data.toString());
            }
        );

    });

}());
