const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    clean:true,
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  watch:true,
  devServer:{
    watchFiles:["src/**/*"],
    static:{
      directory:path.resolve(__dirname, 'dist')
    },
    watchFiles:["src/**/*"],
    port: 3000,
    open:true,
    hot:true,
    compress:true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
	    inject: false,
        filename: "index.html",
        template: 'src/index.html' 
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ],
  },
  mode: 'development',
}

