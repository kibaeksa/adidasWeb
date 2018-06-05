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
var nodeSass = require('node-sass');
var rename = require('gulp-rename');

// for parameter from CLI
var args = require('yargs').argv;

var sassInject = {
    path : '',
    source : ''
};

var handleSassInject  = function(_path){
    if (fs.existsSync(path.resolve(_path))) {
        if(_path.match(/(\W+|\w+)\.scss/)){
            var sassString = fs.readFileSync(path.resolve(_path),'utf8');
            if(sassString != ''){
                try {
                    sassInject.source = nodeSass.renderSync({
                        data : sassString,
                        outputStyle : 'compressed'
                    });

                    sassInject.source = sassInject.source.css.toString();
                    sassInject.path = _path.replace(/(\W+|\w+)\.scss/,'');

                    gulp.start('sass-inline:inject');
                } catch (e) {
                    console.log(e.message);
                    console.log(e.formatted);
                }
            }else{
                console.log('Empty scss file!')
            }

        }
    }
};

// gulp.task('sass', function () {
//     gulp.src('./app/css/adidas/scss/campaign.scss')
//          .pipe(sass().on('error',sass.logError))
//          .pipe(gulp.dest('./app/css/adidas/event/'))
// });
//
// gulp.task('sass-inline',function(){
//     gulp.src('./app/html/adidas/event/**/*.scss',{base : './'})
//         .pipe(sass({ outputStyle : 'compressed'}).on('error',sass.logError))
//         .pipe(gulp.dest(function(file){
//             sassInject.path = path.join(path.dirname(file.path) , '');
//             return './';
//         }))
//         .pipe(notify(function(){
//             gulp.start('sass-inline:inject');
//         }));
// });

gulp.task('sass-inline:inject',function(){
    gulp.src(path.join(sassInject.path,'*.html'))
        .pipe(inject.after('<div id="container_r">','\n<style type="text/css">'+sassInject.source+'</style>'))
        .pipe(inject.after('<div id="container_r" class="campaign-content">','\n<style type="text/css">'+sassInject.source+'</style>'))
        .pipe(inject.after('<div id="container_r" class="campaign-content" >','\n<style type="text/css">'+sassInject.source+'</style>'))
        .pipe(inject.after('<div id="container_r"class="campaign-content">','\n<style type="text/css">'+sassInject.source+'</style>'))
        .pipe(inject.after('<div id="container_r"class="campaign-content" >','\n<style type="text/css">'+sassInject.source+'</style>'))
        .pipe(inject.after('<div class="campaign-content" id="container_r">','\n<style type="text/css">'+sassInject.source+'</style>'))
        .pipe(inject.after('<div class="campaign-content" id="container_r" >','\n<style type="text/css">'+sassInject.source+'</style>'))
        .pipe(inject.after('<div class="campaign-content"id="container_r">','\n<style type="text/css">'+sassInject.source+'</style>'))
        .pipe(inject.after('<div class="campaign-content"id="container_r" >','\n<style type="text/css">'+sassInject.source+'</style>'))
        .pipe(inject.after('<div id="contents_wrap">','\n<style type="text/css">'+sassInject.source+'</style>'))
        .pipe(inject.replace('<script type="text/javascript" src="/data/eventRouter.js"></script>',''))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(path.join(sassInject.path , 'build')))
        .pipe(connect.reload());
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
    // gulp.watch('./app/html/adidas/event/**/*.scss',['sass-inline']);
    // gulp.watch('./app/html/adidas/event/**/*.html',['sass-inline']);
    gulp.watch('./app/html/adidas/event/**/*.scss').on('change',function(file){
        if(!file.path.match(/\\build\\?/)){
            handleSassInject(file.path);
        }
    });

    gulp.watch('./app/html/adidas/event/**/*.html').on('change',function(file){
        if(!file.path.match(/\\build\\?/)){
            handleSassInject(file.path.replace(/(\W+|\w+)\.html/,'index.scss'));
        }
    });

    gulp.watch('./app/html/reebok/event/about/campaign/**/*.scss').on('change',function(file){
        if(!file.path.match(/\\build\\?/)){
            handleSassInject(file.path , 'reebok');
        }
    });

    gulp.watch('./app/html/reebok/event/about/campaign/**/*.html').on('change',function(file){
        if(!file.path.match(/\\build\\?/)){
            handleSassInject(file.path.replace(/(\W+|\w+)\.html/,'index.scss') , 'reebok');
        }
    })

    /* 180518 프로모션 리뉴얼 이창욱 01046582731 전화주세요 */

    // gulp.watch('./app/html/reebok/campaign/**/*.scss').on('change',function(file){
    //     if(!file.path.match(/\\build\\?/)){
    //         handleSassInject(file.path , 'reebok');
    //     }
    // });
    //
    // gulp.watch('./app/html/reebok/campaign/**/*.html').on('change',function(file){
    //     if(!file.path.match(/\\build\\?/)){
    //         handleSassInject(file.path.replace(/(\W+|\w+)\.html/,'index.scss') , 'reebok');
    //     }
    // })

    /* 180518 프로모션 리뉴얼 END*/


    gulp.watch('./app/css/adidas/scss/campaign.scss',['sass']);
});


gulp.task('default',['server','watch'],function(){
    // appJs.init();
});
