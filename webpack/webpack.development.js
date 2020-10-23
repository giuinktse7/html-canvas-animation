const NpmDtsPlugin = require("npm-dts-webpack-plugin");
const path = require("path");

module.exports = config => ({
  mode: "development",
  entry: [path.resolve(config.sourceDir, "./index.ts")],
  devtool: "source-map",
  plugins: [
    new NpmDtsPlugin({
      output: path.resolve(config.buildDir, "./debug/index.d.ts"),
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
                outDir: path.resolve(config.buildDir, "./debug"),
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
    filename: "html-canvas-animation.js",
    path: path.resolve(config.buildDir, "./debug"),
    library: "html-canvas-animation",
    libraryTarget: "umd",
  },
});
