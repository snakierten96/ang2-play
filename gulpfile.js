var gulp  = require('gulp'),
    del = require('del'),
    sourcemaps  = require('gulp-sourcemaps'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    tsProject = tsc.createProject('tsconfig.json'),
    config = require('./gulp.config')();

var browserSync = require('browser-sync'),
    fallback = require('connect-history-api-fallback'),
    log = require('connect-logger');

gulp.task('clean:all', ['clean:ts-target','clean:libs','clean:assets']);

gulp.task('clean:ts-target', function () {
  return del(config.buildPath + '/app/**/*.js');
});

gulp.task('clean:libs', function () {
  return del(config.buildPath + '/lib/**/*');
});

gulp.task('clean:assets', function () {
  var mapAssets = config.assets.map(el => { 
    return el.replace(/\.\/src/, config.buildPath)
      .replace(/\.ts$/, '.js')
      .replace(/\*$/,'*.{html,htm,css}');
  });

  return del(mapAssets);
});

gulp.task('copy:libs', ['clean:libs'], function () {
  return gulp.src(config.libs,{ base: 'node_modules' }).pipe(gulp.dest(config.buildPath+'/lib'))
});

gulp.task('copy:assets', ['clean:assets'], function () {
  return gulp.src(config.assets,{ base: './src' }).pipe(gulp.dest(config.buildPath));
});

gulp.task('ts-lint', function () {
  return gulp.src(config.allTS)
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      emitError: false
    }));
});

gulp.task('compile-ts', ['clean:ts-target'], function () {
  var sourceTsFiles = [
    config.allTS,
    config.typings
  ];
  
  var tsResult = gulp
    .src(sourceTsFiles)
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));
      
  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.buildPath));
});

gulp.task('serve', ['clean:all', 'copy:libs', 'copy:assets', 'compile-ts'], function (cb) {


  // Watch ts source and assets for changes    
  gulp.watch([config.allTS], ['compile-ts']);
  gulp.watch(config.assets,['copy:assets']);


  browserSync({
    port: +process.env.PORT || 8080,
    injectChanges: false,
    server: {
      baseDir: config.buildPath,
      middleware: [
        log({ format: '%date %status %method %url'}),
        fallback({
            index: '/index.html',
            htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
        })
      ]
    },
    ui: {
      port: +process.env.PORT+1 || 8081
    }
  });
  
  // Reload on build change
  gulp.watch([config.buildPath + '/**/*.{html,htm,css,js}'],browserSync.reload, cb);
    
});

gulp.task('default',['serve']);