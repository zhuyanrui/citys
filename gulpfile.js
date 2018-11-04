/*
 * @Author: zhuyanrui 
 * @Date: 2018-11-04 18:39:12 
 * @Last Modified by: zhuyanrui
 * @Last Modified time: 2018-11-04 20:00:28
 */
var gulp = require('gulp');
var sass = require("gulp-sass"); //编译sass
var server = require('gulp-webserver'); //起服务
var clean = require('gulp-clean-css'); //压缩css
var auto = require('gulp-autoprefixer'); //自动添加前缀
var uglify = require('gulp-uglify'); //压缩js
var fs = require('fs');
var url = require('url');
var path = require('path');
var data = require('./mock/city.json');
console.log(data);
// var babel = require('gulp-babel'); //e6转es5
//建任务  编译样式
gulp.task('devcss', function() {
        return gulp.src('./src/sass_styles/style.scss')
            .pipe(sass())
            .pipe(auto({
                browsers: ['last 2 versions']
            }))
            .pipe(clean())
            .pipe(gulp.dest('./src/styles'))
    })
    //监听
gulp.task('watch', function() {
        return gulp.watch('./src/sass_styles/style.scss', gulp.series('devcss'))
    })
    //起服务
gulp.task('devserver', function() {
        return gulp.src('src')
            .pipe(server({
                port: 9090,
                // open:true,
                middleware: function(req, res, next) {
                    if (req.url === '/favicon.ico') {
                        return res.end()
                    }
                    var pathname = url.parse(req.url).pathname;
                    if (pathname === '/') {
                        res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')));
                    } else if (req.url === '/api/load') {
                        res.end(JSON.stringify({ code: 0, data: data }))
                    } else {
                        res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                    }
                }

            }))

    })
    //合并
gulp.task('dev', gulp.series('devcss', 'devserver', 'watch'))