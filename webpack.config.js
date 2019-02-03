var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var devMode = process.env.NODE_ENV !== "production";
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    stats: "errors-only",
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.(sa|sc|c)ss$/,
          // test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Project Demo",
      minify: {
        collapseWhitespace: false
      },
      hash: true,
      template: "./src/index.ejs"
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    })
  ]
};
