const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssUrlRelativePlugin = require('../../..');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    'page/index': path.join(__dirname, 'src/page/index.css')
  },
  output: {
    publicPath: '',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CssUrlRelativePlugin()
  ]
};
