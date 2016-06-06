(function() {
    'use strict';

    var gulp = require('gulp');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var replace = require('gulp-replace');
    var scripts = [];

    gulp.task('default', ['scripts', 'meta', 'readme']);

    gulp.task('meta', function() {
        return gulp.src('src/**/*.js')
            .pipe(setMetaBlock())
            .pipe(rename(function(path) {
                path.basename += '.meta';
            }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('scripts', ['meta'], function() {
        scripts.length = 0;
        return gulp.src('src/**/*.js')
            .pipe(uglify())
            .pipe(addMetaBlock())
            .pipe(rename(function(path) {
                path.basename += '.user';
            }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('readme', ['scripts'], function() {
        return gulp.src(['src/README.md'])
            .pipe(replace('{{INDEX}}', generateMarkdown()))
            .pipe(gulp.dest('./'));
    });

    function generateMarkdown() {
        var text = '';
        scripts.forEach(function(s, idx){
            text += '**[' + s.name + '](' + s.homeUrl + ")**\n\n";
            text += '[![version ' + s.version + '](https://img.shields.io/badge/version-' + s.version + '-brightgreen.svg)](' + s.homeUrl + ")\n\n";
            if (s.description !== '') {
                text += s.description + "\n\n";
            }
            if ((idx + 1) < scripts.length) {
                text += "-----\n\n";
            }
        });
        return text.trim();
    }

    function addMetaBlock() {
        function transform(file, cb) {
            file.contents = Buffer.concat([new Buffer(generateMeta(file)), file.contents]);

            cb(null, file);
        }

        return require('event-stream').map(transform);
    }

    function setMetaBlock() {
        function transform(file, cb) {
            file.contents = new Buffer(generateMeta(file));

            cb(null, file);
        }

        return require('event-stream').map(transform);
    }

    function generateMeta(file) {
        var json = getPackageJson(file);
        var buildInfo = getBuildInfo(json['gm-build-info']);

        var re = /^(?:(?:.+[\/\\])[0-9a-zA-Z_-]+[\/\\])*(([0-9a-zA-Z_-]+)[\/\\][0-9a-zA-Z_-]+)\.js$/;
        var safePath = file.path.replace(/\\/g, '/');
        var ghBaseUrl = 'https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/';

        var updateUrl = ghBaseUrl + safePath.replace(re, '$1.meta.js');
        var downloadUrl = ghBaseUrl + safePath.replace(re, '$1.user.js');
        var homeUrl = ghBaseUrl + safePath.replace(re, '$2/');

        var script = {
            'name':        json['nice-name'],
            'description': json['description'],
            'version':     json['version'],
            'updateUrl':   updateUrl,
            'downloadUrl': downloadUrl,
            'homeUrl':     homeUrl,
            'urls':        buildInfo['urls'],
            'excludes':    buildInfo['excludes'],
            'require':     buildInfo['require'],
            'grant':       buildInfo['grant']
        };

        scripts.push(script);

        var meta = '// ==UserScript==' + "\n"
                 + '// @name        ' + script.name + "\n"
                 + '// @description ' + script.description + "\n"
                 + '// @version     ' + script.version + "\n"
                 + '// @updateUrl   ' + script.updateUrl + "\n"
                 + '// @downloadUrl ' + script.downloadUrl + "\n";

        script.urls.forEach(function(url) {
            meta += '// @include     ' + url + "\n";
        });

        script.excludes.forEach(function(url) {
            meta += '// @exclude     ' + url + "\n";
        });
        script.require.forEach(function(url) {
            meta += '// @require     ' + url + "\n";
        });
        script.grant.forEach(function(url) {
            meta += '// @grant       ' + url + "\n";
        });

        meta += '// ==/UserScript==' + "\n";

        return meta;
    }

    function getPackageJson(file) {
        var path = file.path.replace(/^(.+[\/\\])[0-9a-zA-Z_-]+\.js$/, '$1package.json');
        var json = require(path);

        return json;
    }

    function getBuildInfo(json) {
        var info = {
            'urls':     [],
            'excludes': [],
            'require':  [],
            'grant':    ['none']
        };

        if (typeof json['urls'] !== 'undefined') {
            info['urls'] = json['urls'];
        }
        if (typeof json['excludes'] !== 'undefined') {
            info['excludes'] = json['excludes'];
        }
        if (typeof json['require'] !== 'undefined') {
            info['require'] = json['require'];
        }
        if (typeof json['grant'] !== 'undefined') {
            info['grant'] = json['grant'];
        }

        return info;
    }
}());