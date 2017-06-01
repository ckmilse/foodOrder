const gulp = require('gulp');
const gulp_replace = require('gulp-replace');
// const jsdom = require("jsdom");
// const $ = require('jquery')(jsdom.jsdom().parentWindow);
const fs = require("fs");
const cheerio = require('cheerio'); //解析html字符串
gulp.task('more', function() {
    console.log('more')
    let html = fs.readFileSync('dist/index.html', 'utf-8');
    let $ = cheerio.load(html);
    let tempScriptArr = Array.from($('script')); //用于获取script标签
    let tempCssArr = Array.from($('link[rel="stylesheet"]'));//获取link， css相关
    let tempSrcArr = [];

    //便利放入 tempSrcArr
    tempScriptArr.forEach((item, idex, arr)=>{
        if(item.attribs.src) {
            tempSrcArr.push(item.attribs.src);
        }
    });
    tempCssArr.forEach((item, idex, arr)=>{
        if(item.attribs.href) {
            console.log(item.attribs.href);
            tempSrcArr.push(item.attribs.href);
        }
    });
    //主任务，do the job
    gulp.src('./src/meta/app.mainfest')
        .pipe(gulp_replace('<%Date%>', new Date().getTime()))
        .pipe(gulp_replace('#--replace---startscript--', tempSrcArr.join('\n')))
        .pipe(gulp.dest('dist'));
});
