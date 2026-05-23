const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: path.resolve(__dirname, "src", "index.tsx"), //프로젝트가 시작되는 파일을 지정합니다.
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [ //다양한 파일 형식을 처리하기 위한 규칙을 정의합니다.
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],//CSS 파일 처리
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                icon: true,
              },
            },
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?ver=[hash]",
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|jpeg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?ver=[hash]", //이미지 파일을 번들링하고 해시 값을
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      chunkFilename: "[name].js?ver=[hash]",
      filename: "[name].js?ver=[hash]",
      publicPath: "/",
    },
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      minimize: isProduction,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new Dotenv({
        allowEmptyValues: true,
        systemvars: true,
      }),
    ],
  };
};