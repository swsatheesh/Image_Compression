require('babel-polyfill');
var DashboardPlugin = require('webpack-dashboard/plugin');
var path = require('path');
var webpack = require('webpack');
const fs = require('fs');

module.exports = {
    cache: true,
    plugins: [
      new DashboardPlugin()
    ],
    entry: {
      'bundle': [
        'babel-polyfill',
        './src/index'
      ]
    },
    devtool: '#source-map',
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: 'http://172.25.10.172:8080/',
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        { loader: 'babel-loader', test: /\.js$/, exclude: /node_modules/ },
        { test: /\.js$/, include: /node_modules\/cdlo_components/, loader: 'babel-loader' },
        { test: /\.jsx?$/, loader: 'babel-loader' },
        { test: /\.scss$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader?sourceMap" },
                { loader: "sass-loader?sourceMap" }
            ]
        },
        { test: /\.css$/, loader: 'style-loader!css' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
        { test: /\.html$/, loader: 'html-loader?config=otherHtmlLoaderConfig' },
        { test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=100000' },
        { test: /\.(ttf|otf)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=100000&mimetype=application/octet-stream' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.(mp3|wav)$/, loader: 'url-loader?limit=1' },
        { test: /\.mp4$/, loader: 'url-loader?limit=10000&mimetype=video/mp4' },
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=1' }
      ]
    },
    devServer: {
      port: 8080,
      compress: true,
      disableHostCheck: true,
      proxy: {
        '/files': 'http://localhost:3000'
      },
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    }
  };