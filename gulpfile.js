var express = require('express');
var server =require('gulp-express');
var app = express();
var fs = require('fs');
var path = require('path');

// for gulp
var gulp = require('gulp');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var inject = require('gulp-inject-string');

// for parameter from CLI
var args = require('yargs').argv;

var sassInject = {
    path : '',
    source : ''
};

gulp.task('sass', function () {
    gulp.src('./app/css/adidas/scss/campaign.scss')
         .pipe(sass().on('error',sass.logError))
         .pipe(gulp.dest('./app/css/adidas/event/'))
});

gulp.task('sass-inline',function(){
    gulp.src('./app/html/adidas/event/**/*.scss',{base : './'})
        .pipe(sass({ outputStyle : 'compressed'}).on('error',sass.logError))
        .pipe(gulp.dest(function(file){
            sassInject.path = path.join(path.dirname(file.path) , '');
            return './';
        }))
        .pipe(notify(function(){
            gulp.start('sass-inline:inject');
        }));
});

gulp.task('sass-inline:inject',function(){
    gulp.src(path.join(sassInject.path,'*.html'))
        .pipe(inject.after('<!-- Inject css from index.sass -->','\n<style type="text/css">'+fs.readFileSync(path.join(sassInject.path,'index.css'), 'utf8')+'</style>'))
        .pipe(gulp.dest(path.join(sassInject.path , 'build')));
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
    gulp.watch('./app/html/adidas/event/**/*.scss',['sass-inline']);
    gulp.watch('./app/html/adidas/event/**/*.html',['sass-inline']);
    gulp.watch('./app/css/adidas/scss/campaign.scss',['sass']);
});


gulp.task('default',['server','watch'],function(){
    // appJs.init();
});
