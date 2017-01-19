const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
  entry: {
    app: ['./src/main.ts'],
    styles: './src/styles.scss'
  },
  output: {
    path: "./dist",
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [{
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
      loaders: [ 'style-loader', 'css-loader', 'postcss-loader']
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      exclude: /node_modules/,
      loader: 'file-loader?name=[path][name].[ext]'
    }]
  },
  postcss: function() {
    return [require('postcss-import'), require("postcss-url"), require('precss'), require('postcss-nested'), require('autoprefixer')];
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets', force: true }
    ]),
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
    }),
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico'
    })
  ]
};
