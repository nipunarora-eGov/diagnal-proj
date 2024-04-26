
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');


module.exports = () => {
  const prodConfig = {
    mode: "production",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/diagnal-proj/', // Change this to your GitHub Pages repository name
    },
    devServer: {
      port: 8000,
      historyApiFallback: {
        index: "/",
      },
      server:"http", //Enable HTTPS
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }), 
    ]
  };

  return merge(commonConfig, prodConfig);
};
