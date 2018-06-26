const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration')).development();

const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';
const app = path.resolve('app/');
const build = path.resolve('../build', env);

module.exports = {
  entry: app,
  output: {
    path: build,
    filename: '[name].js',
  },
  resolve: {
    modules: [
      app,
      'node_modules',
    ],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            "es2015",
            "react",
            "stage-2"
          ]
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'eslint-loader',
          options: {
            emitError: true,
          }

        }

      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true } },
            'postcss-loader',
            'less-loader'
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true }
            },
          ],
        }),
      },
      {
        test: webpackIsomorphicToolsPlugin.regularExpression('images'),
        loader: 'url-loader?limit=10240',
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(app, 'index.html'),
    }),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks(module) {
        return module.context &&
          module.context.indexOf('node_modules') >= 0;
      }
    }),
    webpackIsomorphicToolsPlugin
  ]
};
