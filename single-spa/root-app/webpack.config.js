const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const webpack = require("webpack");

module.exports = (webpackConfigEnv, argv) => {
  const mode = argv.mode ?? "development";
  require("dotenv").config({ path: `./.env.${mode}` });

  const defaultConfig = singleSpaDefaults({
    orgName: "onework",
    projectName: "root-app",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      // new webpack.ProvidePlugin({
      //   process: "process/browser",
      // }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ],
    devServer: {
      host: process.env.HOST,
      port: process.env.PORT,
      client: {
        webSocketURL: `http://${process.env.HOST}:${process.env.PORT}/ws`,
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    },
    output: {
      libraryTarget: "system",
    },
    externals: [/^@onework\/.+/],
  });
};
