const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssPlugins = function() { return [ precss, autoprefixer ]; };
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
      '201901-CDP': './201901-CDP/index.ts',
    },
    mode: 'production',
    output: {
      path: path.resolve(__dirname, 'docs'),
      publicPath: '/',
      filename: '[name]/[name].[hash].js'
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    devtool: 'source-map',
    module: {
      rules: [
        { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
        { test: /\.scss$/, use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader'},
            { loader: 'postcss-loader', options: { plugins: postcssPlugins }},
            { loader: 'sass-loader' }
        ]},
        // Convert images < 8kb to base64 strings
        { test: /\.(png|jp(e*)g|svg)$/, loader: 'url-loader', options: { limit: 8000, name: '[path][hash].[ext]' } },
        { test: /\.(json)/, type: 'javascript/auto', loader: 'url-loader', options: { limit: 8000, name: '[path][hash].[ext]' }},
        { test: /\.html$/, loader: 'html-loader' }
    ]},
    resolve: {
      // allow imports without file extension
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['201901-CDP'],
            template: path.resolve(__dirname, 'src', '201901-CDP/index.html'),
            favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
          filename: '404.html',
          chunks: ['201901-CDP'],
          template: path.resolve(__dirname, 'src', '201901-CDP/index.html'),
          favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
          inject: 'body'
        }),
        new HtmlWebpackPlugin({
          filename: '201901-CDP/index.html',
          chunks: ['201901-CDP'],
          template: path.resolve(__dirname, 'src', '201901-CDP/index.html'),
          favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
          inject: 'body'
        }),
        new CompressionPlugin({
          test: /\.(json|js|css|html)$/i,
          exclude: /(node_modules)/,
        }),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "[name]/[hash].css",
          chunkFilename: "[id].css"
      })
    ]
  }