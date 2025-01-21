const path = require('path');

module.exports = {
  reactScriptsVersion: "react-scripts" /* (default value) */,
  devServer: (devServerConfig) => ({
    ...devServerConfig,
    proxy: {
      "/api": {
        target: process.env.DEV_FE_API_PROXY_TARGET,
        changeOrigin: true,
      },
    },
  }),
};
