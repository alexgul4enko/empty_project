import './init-env'
import path from 'path'
import webpack from 'webpack'
import Dotenv from 'dotenv-webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import configureProxy from './presets/proxy'

const isDevelopment = process.env.NODE_ENV !== 'production'
module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: 'index.js',
  output: {
    path: path.resolve(process.env.OUTPUT_PATH),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      '@img': path.resolve(`${process.env.SOURCES_PATH}/img`),
    },
    modules: ['node_modules', path.resolve(`${process.env.SOURCES_PATH}/app`)],
    extensions: ['.js', '.jsx', '.json', '.css', '.sass', '.scss'],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
  devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
  devServer: {
    port: process.env.DEV_SERVER_PORT || 3000,
    contentBase: './dist',
    historyApiFallback: true,
    watchContentBase: true,
    hot: true,
    host: process.env.DEV_SERVER_HOST,
    inline: true,
    https: false,
    publicPath: '/',
    disableHostCheck: true,
    allowedHosts: [
      '.localhost',
        `.${process.env.MAIN_HOST}`,
    ],
    proxy: configureProxy(),
  },
  optimization: {
    minimize: !isDevelopment,
    minimizer: [
      !isDevelopment && new TerserPlugin(),
      !isDevelopment && new CssMinimizerPlugin(),
    ].filter(Boolean),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                isDevelopment && 'react-refresh/babel',
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpg|svg)$/,
        use: 'file-loader',
      },
      {
        test: /^.*\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'style-loader',
            options: {
              insert: function insertAtTop(element) {
                const parent = document.querySelector('head')
                const lastInsertedElement = window._lastElementInsertedByStyleLoader

                if(!lastInsertedElement) {
                  parent.insertBefore(element, parent.firstChild)
                } else if(lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling)
                } else {
                  parent.appendChild(element)
                }

                window._lastElementInsertedByStyleLoader = element
              },
            },
          },
          'css-loader',
        ],
      },
      {
        test: [/^.*\.sass$/, /^.*\.scss$/],
        exclude: /node_modules/,
        use: [
          isDevelopment
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '/',
                },
              },
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentWidth: 4,
                includePaths: ['./src/styles', './node_modules'],
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env', {
                    stage: 4,
                    autoprefixer: { grid: true, flexbox: true },
                  }],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: '[name].css',
      // chunkFilename: '[id].css',
      // ignoreOrder: true,
      filename: ({ chunk }) => `${chunk.name.replace('/js/', '/css/')}.css`,
    }),
    new CleanWebpackPlugin(),
    new Dotenv({
      path: process.env.ENVFILE || '.env.default',
      safe: '.env.default',
      allowEmptyValues: true,
      systemvars: true,
      defaults: false,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: process.env.APP_NAME,
    }),
    new ReactRefreshWebpackPlugin(),
  ],
}
