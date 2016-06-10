(function() {
    'use strict';

    var BUILD_MODE = {
        'DEV': 1,
        'PROD': 2,
        'META': 3
    };

    var gulp = require('gulp');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var replace = require('gulp-replace');
    var scripts = [];

    gulp.task('default', ['scripts', 'meta', 'readme']);
    gulp.task('dev', ['scripts-dev']);

    gulp.task('meta', function() {
        return gulp.src('src/**/*.js')
            .pipe(addMetaBlock())
            .pipe(rename(function(path) {
                path.basename += '.meta';
            }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('scripts', ['meta'], function() {
        return gulp.src('src/**/*.js')
            .pipe(replaceScriptMetadata())
            .pipe(uglify())
            .pipe(addProdMetaBlock())
            .pipe(rename(function(path) {
                path.basename += '.user';
            }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('scripts-dev', function() {
        return gulp.src('src/**/*.js')
            .pipe(replaceScriptMetadata())
            .pipe(addDevMetaBlock())
            .pipe(rename(function(path) {
                path.basename += '.user';
            }))
            .pipe(gulp.dest('dev'));
    });

    gulp.task('readme', ['scripts'], function() {
        return gulp.src(['src/README.md'])
            .pipe(replace('{{INDEX}}', generateMarkdown()))
            .pipe(gulp.dest('./'));
    });

    function generateMarkdown() {
        var text = '';
        scripts.sort(function(a, b) {
            var r1 = a['name'].toLowerCase();
            var r2 = b['name'].toLowerCase();
            r1 = r1.replace(/^((an?|the) )/, '');
            r2 = r2.replace(/^((an?|the) )/, '');
            return ((r1 === r2) ? 0 : ((r1 > r2) ? 1 : -1));
        });
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

    function replaceScriptMetadata() {
        function transform(file, cb) {
            var meta = getScriptMeta(file);
            var contents = String(file.contents);
            Object.keys(meta).forEach(function(key){
                contents = contents.replace('{{' + key.toUpperCase() + '}}', meta[key]);
            });
            file.contents = new Buffer(contents);
            cb(null, file);
        }

        return require('event-stream').map(transform);
    }

    function addMetaBlock() {
        function transform(file, cb) {
            file.contents = new Buffer(generateMeta(file, BUILD_MODE.META));

            cb(null, file);
        }

        return require('event-stream').map(transform);
    }

    function addDevMetaBlock() {
        function transform(file, cb) {
            file.contents = Buffer.concat([new Buffer(generateMeta(file, BUILD_MODE.DEV)), file.contents]);

            cb(null, file);
        }

        return require('event-stream').map(transform);
    }

    function addProdMetaBlock() {
        function transform(file, cb) {
            file.contents = Buffer.concat([new Buffer(generateMeta(file, BUILD_MODE.PROD)), file.contents]);

            cb(null, file);
        }

        return require('event-stream').map(transform);
    }

    function getScriptMeta(file) {
        var json = getPackageJson(file);
        var buildInfo = getBuildInfo(json['gm-build-info']);

        var re = /^(?:(?:.+[\/\\])[0-9a-zA-Z_-]+[\/\\])*(([0-9a-zA-Z_-]+)[\/\\][0-9a-zA-Z_-]+)\.js$/;
        var safePath = file.path.replace(/\\/g, '/');
        var ghBaseUrl = 'https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/';

        var updateUrl = ghBaseUrl + safePath.replace(re, '$1.meta.js');
        var downloadUrl = ghBaseUrl + safePath.replace(re, '$1.user.js');
        var homeUrl = ghBaseUrl + safePath.replace(re, '$2/');

        return {
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
    }

    function generateMeta(file, mode) {
        var script = getScriptMeta(file);
        if (mode === BUILD_MODE.PROD) {
            scripts.push(script);
        }

        var meta = '// ==UserScript==' + "\n";

        if (mode === BUILD_MODE.DEV) {
            meta += '// @name        ' + script.name + " (Dev)\n";
        } else {
            meta += '// @name        ' + script.name + "\n";
        }

        meta += '// @description ' + script.description + "\n"
             +  '// @version     ' + script.version + "\n";

        if (mode !== BUILD_MODE.DEV) {
            meta += '// @updateUrl   ' + script.updateUrl + "\n"
                 +  '// @downloadUrl ' + script.downloadUrl + "\n";
        }

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