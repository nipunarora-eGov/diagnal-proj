
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");



module.exports = () => {
  const devConfig = {
    mode: "development",
    output: {
      publicPath: `https://localhost:8000/`,
      filename: "[name].[contenthash].js",
    },
    devServer: {
      port: 8000,
      historyApiFallback: {
        index: "/",
      },
      server:"https", //Enable HTTPS
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }), 
    ]
  };

  return merge(commonConfig, devConfig);
};
