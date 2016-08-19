var gulp  = require('gulp'),
    config = require('./gulp.config')();

console.log( gulp.src(config.allTS) );
