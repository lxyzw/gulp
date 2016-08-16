/**
 * Created by Administrator on 2016/8/16.
 */
"use strict";
//载入gulp的核心包
const gulp = require("gulp");
//gulp是用来帮我们执行一些重复操作的，一般我们将重复操作划分为不同的任务
//如何定义一个任务
//第一个参数是任务名，第二个参数是任务的执行体
gulp.task("hello",function(){
    console.log("world");
    //这里编写一些重复性的流程
});
//让任务运行借助于命令行


//拷贝文件
gulp.task("dest",function(){
    //获取文件gulp.src
    //还可以传入数组gulp.src(["src/index.html","src2/index1.html"])
    //"!src/demo.html"表示排除这个文件
    gulp.src("src/*.html")//*匹配所有的html文件到dist文件夹下
        //    gulp.src("src/*/*.*") //匹配src中所有的文件夹到dist文件夹下，这种方式只能统配一级目录，要写两个*/*/就是二级目录，（gulp提供了**表示递归下去目录）
        //    gulp.src("src/index.html")将src文件里面的index文件拷贝到dist文件夹下面
        //.pipe让文件流走向下一个环节
        .pipe(gulp.dest("dist/"));
});


//gulp中r任务比较特殊的是默认任务default
gulp.task("default",function(){
    console.log("这是默认任务");
    //当src这个目录下的所有文件发生变化时自动执行后面的任务
    gulp.watch("src/*",["dest"]);//监视某个任务是否发生变化
});
//gulp原生不支持任何功能，只提供了最基本的api


//less插件
const less = require("gulp-less");
gulp.task("style",function(){
    gulp.src("src/**/*.less")
        //让less转换为css gulp-less
        .pipe(less())
        .pipe(gulp.dest("dist/"));
});
gulp.task("watch",function(){
    gulp.watch("src/**/*.less",["style"]);
});

//gulp-connect  创建本地服务器
const connect = require("gulp-connect");
gulp.task("serve",function(){
    //创建一个服务器，默认监听8080端口
   connect.server({
       root:"public",//根目录
       livereload:true
   });
    gulp.watch("public/**/*.*",["reload"]);
});
gulp.task("reload",function(){
    gulp.src("public/**/*.*").pipe(connect.reload());
});