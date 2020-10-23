const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = config => ({
  mode: "production",
  entry: [path.resolve(config.sourceDir, "./index.ts")],
  devtool: "source-map",
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./package.json" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                outDir: path.resolve(config.buildDir, "./release"),
              },
            },
          },
        ],
        include: /src/,
      },
    ],
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".ts"],
  },
  output: {
    filename: "html-canvas-animation-min.js",
    path: path.resolve(config.buildDir, "./release"),
    library: "html-canvas-animation",
    libraryTarget: "umd",
  },
});
