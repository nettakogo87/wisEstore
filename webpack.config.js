const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

/** getWebpackConfig should accept "dev" or "prod" */
module.exports = function getWebpackConfig(env = "dev") {
  var config = {};
  config.entry = {
    app: ['./src/main.ts'],
    styles: './src/styles.scss'
  };
  config.output = {
    path: env === "dev" ? __dirname : "./dist",
    filename: '[name].js'
  };
  if (env === "dev") {
    config.devtool = 'source-map';
  }
  config.resolve = {
    extensions: ['', '.ts', '.js']
  };
  config.module = {};
  if (env === "dev") {
    config.module.preLoaders = [{
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'tslint-loader'
    }];
  }
  config.module.loaders = [{
    test: /\.ts$/,
    exclude: /node_modules/,
    loaders: ['ts-loader', 'angular1-template-loader']
  }, {
    test: /\.html$/,
    exclude: [
      /node_modules/,
      path.resolve(__dirname, 'src/index.html')
    ],
    loaders: ['ngtemplate-loader', 'html-loader']
  }, {
    test: /\.scss$/,
    exclude: /node_modules/,
    loaders: ['style-loader', 'css-loader', 'postcss-loader']
  }, {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    exclude: /node_modules/,
    loader: 'file-loader?name=[path][name].[ext]'
  }, {
    test: /\.json$/,
    loader: 'json-loader'
  }];
  config.postcss = function() {
    return [require('postcss-import'), require("postcss-url"), require('stylelint'), require('precss'), require('postcss-nested'), require('autoprefixer')];
  };
  config.plugins = [
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery"
    })
  ];
  if (env === "prod") {
    config.plugins.push(
      new CopyWebpackPlugin([
          { from: 'src/assets', to: 'assets', force: true }
      ])
    );
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        cacheFolder: path.resolve(__dirname, 'dist/cached_uglify/'),
        sourceMap: false,
        output: {
          comments: false
        },
        compressor: {
          warnings: false
        }
      })
    );
  }
  return config;
}
