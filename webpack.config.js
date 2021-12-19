const path = require("path");
module.exports = {
  entry: {
    server: "./index.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  target: "node",
  module: {
    rules: [
      {
        // Dịch từ ES6 sang ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
    "express": "require('express')"
  }
};