const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";
let target = "web";

if (mode === "production") {
  target = "browserslist";
}
module.exports = {
  mode: mode,
  target: target,
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    assetModuleFilename: "images/[hash][ext][query]",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "resolve-url-loader",
            options: { sourceMap: true },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  devtool: "source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
};
