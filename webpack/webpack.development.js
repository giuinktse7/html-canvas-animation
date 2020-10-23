const path = require("path");

module.exports = config => ({
  mode: "development",
  entry: [config.sourceDir],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                outDir: "./build/debug",
              },
            },
          },
        ],
        include: /src/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "html-canvas-animation.js",
    path: config.buildDir + "/debug",
  },
});
