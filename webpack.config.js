const path = require("path");

const config = {
  sourceDir: path.resolve(__dirname, "./src"),
  buildDir: path.resolve(__dirname, "./build"),
};

function buildConfig(env) {
  let envName;
  switch (env.mode.toLowerCase()) {
    case "dev":
    case "development":
      envName = "development";
      break;
    case "prod":
    case "production":
      envName = "production";
      break;
    default:
      console.log(
        "Wrong webpack build parameter. Possible choices: 'dev' or 'prod'."
      );
      return;
  }
  return require("./webpack/webpack." + envName + ".js")(config);
}

module.exports = buildConfig;
