var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', ['scripts', 'meta']);

gulp.task('meta', function() {
    return gulp.src('src/**/*.js')
        .pipe(setMetaBlock())
        .pipe(rename(function(path) {
            path.basename += '.meta';
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
    return gulp.src('src/**/*.js')
        .pipe(uglify())
        .pipe(addMetaBlock())
        .pipe(rename(function(path) {
            path.basename += '.user';
        }))
        .pipe(gulp.dest('dist'));
});

function prefixStream(prefixText) {
    var stream = through();
    stream.write(prefixText);
    return stream;
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
    var re = /^(?:(?:.+[\/\\])[0-9a-zA-Z_-]+[\/\\])*([0-9a-zA-Z_-]+[\/\\][0-9a-zA-Z_-]+)\.js$/;
    var safePath = file.path.replace(/\\/g, '/');
    var ghBaseUrl = 'https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/';

    var updateUrl = ghBaseUrl + safePath.replace(re, '$1.meta.js');
    var downloadUrl = ghBaseUrl + safePath.replace(re, '$1.user.js');

    var meta = '// ==UserScript==' + "\n"
             + '// @name        ' + json['nice-name'] + "\n"
             + '// @description ' + json.description + "\n"
             + '// @version     ' + json.version + "\n"
             + '// @updateUrl   ' + updateUrl + "\n"
             + '// @downloadUrl ' + downloadUrl + "\n";

    var buildInfo = json['gm-build-info'];

    if (typeof buildInfo['urls'] !== 'undefined') {
        buildInfo.urls.forEach(function(url) {
            meta += '// @include     ' + url + "\n";
        });
    }

    if (typeof buildInfo['excludes'] !== 'undefined') {
        buildInfo.excludes.forEach(function(url) {
            meta += '// @exclude     ' + url + "\n";
        });
    }

    if (typeof buildInfo['require'] !== 'undefined') {
        buildInfo.require.forEach(function(url) {
            meta += '// @require     ' + url + "\n";
        });
    }

    if (typeof buildInfo['require'] !== 'undefined' && buildInfo.grant.length > 0) {
        buildInfo.grant.forEach(function(url) {
            meta += '// @grant       ' + url + "\n";
        });
    } else {
        meta += '// @grant       none' + "\n";
    }
    meta += '// ==/UserScript==' + "\n";

    return meta;
}

function getPackageJson(file) {
    var path = file.path.replace(/^(.+[\/\\])[0-9a-zA-Z_-]+\.js$/, '$1package.json');
    var json = require(path);

    return json;
}