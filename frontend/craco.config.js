// craco.config.js
const path = require("path");

module.exports = {
  reactScriptsVersion: "react-scripts",
  webpack: {
    alias: {
      utils: path.resolve(__dirname, "src/utils/"),
    },
  },
  devServer: (config) => {
    config.proxy = {
      "/api": {
        target: process.env.DEV_FE_API_PROXY_TARGET,
        changeOrigin: true,
      },
    };
    return config;
  },
};
