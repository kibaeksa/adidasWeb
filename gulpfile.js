// for gulp
var express = require('express');
// var appJs = require('./app');
var server =require('gulp-express');
var app = express();
var gulp = require('gulp');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var fs = require('fs');
var path = require('path');

// for parameter from CLI
var args = require('yargs').argv;

gulp.task('sass', function () {
    gulp.src('./app/css/adidas/scss/musthave.scss')
         .pipe(sass().on('error',sass.logError))
         .pipe(gulp.dest('./app/css/adidas/event/'))
});

gulp.task('server',function(){
    // connect.server({
    //     root : './app',
    //     port : 2000,
    //     livereload : true
    // });
    server.run(['app.js']);
});

gulp.task('watch',function(){
    gulp.watch('./app/css/adidas/scss/musthave.scss',['sass']);
});


gulp.task('default',['server','watch'],function(){
    // appJs.init();
});
