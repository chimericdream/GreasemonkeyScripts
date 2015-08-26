var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function() {
    return gulp.src('src/**/*.js')
        .pipe(addMetaBlock())
        .pipe(rename(function(path) {
            path.basename += '.user';
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('meta', function() {
    //
});

gulp.task('scripts', function() {
    //
});

function prefixStream(prefixText) {
    var stream = through();
    stream.write(prefixText);
    return stream;
}

function addMetaBlock() {
    function transform(file, cb) {
        var path = file.path.replace(/^(.+[\/\\])[0-9a-zA-Z_-]+\.js$/, '$1package.json');
        var json = require(path);
        var meta
            = '// ==UserScript==' + "\n"
            + '// @name        ' + json['nice-name'] + "\n"
            + '// @description ' + json.description + "\n"
            + '// @version     ' + json.version + "\n";
        json['gm-build-info'].urls.forEach(function(url) {
            meta += '// @match       ' + url + "\n";
        });
        if (json['gm-build-info'].grant.length > 0) {
            json['gm-build-info'].grant.forEach(function(url) {
                meta += '// @grant       ' + url + "\n";
            });
        } else {
            meta += '// @grant       none' + "\n";
        }
        json['gm-build-info'].require.forEach(function(url) {
            meta += '// @require     ' + url + "\n";
        });
        meta += '// ==/UserScript==' + "\n";

        var metaText = new Buffer(meta);
        file.contents = Buffer.concat([metaText, file.contents]);

        cb(null, file);
    }

    return require('event-stream').map(transform);
}

function readPackageJson() {
}