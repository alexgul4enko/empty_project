import './init-env'
import path from 'path'
import webpack from 'webpack'
import Dotenv from 'dotenv-webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

// import {
//   addPlugins,
//   createConfig,
//   devServer,
//   env,
//   entryPoint,
//   resolve,
//   setEnv,
//   setOutput,
//   sourceMaps,
//   when,
//   customConfig,
//   babel,
//   uglify,
// } from 'webpack-blocks'

// import {
//   react,
//   styles,
//   spa,
//   assets,
//   proxy,
//   sentry,
//   i18n,
// } from './presets'

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
  plugins: [
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
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devtool: isDevelopment ? 'cheap-module-source-map' : undefined,
  devServer: {
    contentBase: './dist',
    hot: isDevelopment,
    historyApiFallback: true,
    watchContentBase: true,
    hot: true,
    inline: true,
    https: false,
  },
  optimization: {
    minimize: !isDevelopment,
    minimizer: [
      !isDevelopment && new TerserPlugin(),
    ].filter(Boolean),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(`${process.env.SOURCES_PATH}/app`),
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
}


// module.exports = createConfig([
//   entryPoint('index.js'),
//   setOutput(path.resolve(`${process.env.OUTPUT_PATH}/[name].js`)),
//   resolve({
//     modules: [
//       path.resolve(`${process.env.SOURCES_PATH}/app`),
//       'node_modules',
//     ],
//     alias: {
//       '@img': path.resolve(`${process.env.SOURCES_PATH}/img`),
//     },
//     extensions: ['.js', '.jsx', '.json', '.css', '.sass', '.scss'],
//   }),
//   setEnv([
//     'API_URL', 'AUTH_HEADER', 'MAIN_HOST', 'APP_NAME',
//     'CACHE_STATE_KEYS', 'STORAGE_KEY', 'SENTRY_DSN', 'SENTRY_ENVIRONMENT', 'CACHE_STATE_PERSIST_KEYS', 'LIMIT',
//   ]),
//   customConfig({
//     watchOptions: {
//       ignored: ['node_modules/**'],
//     },
//     optimization: {
//       splitChunks: {
//         chunks: 'async',
//         maxAsyncRequests: 30,
//         maxInitialRequests: 30,
//         automaticNameDelimiter: '~',
//         enforceSizeThreshold: 50000,
//         cacheGroups: {
//           commons: {
//             test: /[\\/]node_modules[\\/]/,
//             name: 'vendors',
//             chunks: 'all',
//           },
//           default: {
//             minChunks: 2,
//             priority: -20,
//             reuseExistingChunk: true,
//           },
//         },
//       },
//     },
//   }),
//   env('development', [
//     devServer({
//       port: process.env.DEV_SERVER_PORT || 3000,
//       stats: 'minimal',
//       host: process.env.DEV_SERVER_HOST,
//       allowedHosts: [
//         '.localhost',
//         `.${process.env.MAIN_HOST}`,
//       ],
//     }),
//     sourceMaps(),
//   ]),
//
//   env('production', [
//     uglify(),
//   ]),
//   babel(),
//   proxy(),
//   react(),
//   styles(),
//   assets(),
//   i18n(),
// ])
