const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";
let target = "web";

if (mode === "production") {
  target = "browserslist";
}
module.exports = {
  mode: mode,
  target: target,
  plugins: [new MiniCssExtractPlugin()],

  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
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
