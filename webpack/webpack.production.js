const path = require("path");

module.exports = config => ({
  mode: "production",
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
                outDir: "./build/release",
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
    filename: "html-canvas-animation-min.js",
    path: config.buildDir + "/release",
  },
});
