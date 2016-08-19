module.exports = function () {
  var config = {
    allTS: './src/**/*.ts',
    typings: './typings/**/*.d.ts',
    libs: [
      'node_modules/@angular/**/*',
      'node_modules/rxjs/**/*',
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/systemjs/dist/system.src.js'
    ],
    assets: [
      './src/index.html',
      './src/styles.css',
      './src/systemjs.config.js',
      './src/app/**/*',
      '!./src/app/**/*.ts'
    ],
    buildPath: './dist',
  };
    
  return config;
}