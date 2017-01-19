var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");

gulp.task('dev-build', function() {
  var config = require('./webpack.config.dev.js');
  config.entry.app.unshift('webpack-dev-server/client?http://localhost:3000/', 'webpack/hot/dev-server');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  new WebpackDevServer(webpack(config), {
    contentBase: 'src/',
    historyApiFallback: true,
    stats: 'minimal',
    hot: true,
    inline: true
  }).listen(3000, "localhost", function(err) {
    if (err) {
      throw new gutil.PluginError("webpack-dev-server", err);
    }
    gutil.log("[webpack-dev-server]", "http://localhost:3000/index.html");
  });
});

gulp.task('build', function(callback) {
  var config = require('./webpack.config.prod.js');
  webpack(config, function(err, stats) {
    if (err) {
      throw new gutil.PluginError("webpack", err);
    }
    gutil.log("[webpack]", stats.toString("minimal"));
    callback();
  });
});

var watchFiles = ['./src/**/*.ts', './src/**/*.html', './src/**/*.scss'];
gulp.task('reload', ['build'], function() {
  gulp.src(watchFiles)
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(watchFiles, ['reload']);
});

gulp.task('connect', ['build'], function() {
  connect.server({
    name: 'WIS Store',
    root: 'dist',
    port: 8080,
    livereload: true,
    fallback: "dist/index.html"
  });
});

gulp.task('prod-build', ['connect', 'watch']);
gulp.task('default', ['dev-build']);
