const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration')).development();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';
const src = path.resolve('src/');
const build = path.resolve('../build', env);
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',
  entry: src,
  output: {
    path: build,
    filename: '[name].js',
  },
  resolve: {
    modules: [
      src,
      'node_modules',
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
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
            'es2015',
            'react',
            'stage-2'
          ]
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'less-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader'
        ]
      },
      {
        test: webpackIsomorphicToolsPlugin.regularExpression('images'),
        loader: 'url-loader?limit=10240',
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    webpackIsomorphicToolsPlugin
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
