const path = require('path');

module.exports = {
  reactScriptsVersion: "react-scripts" /* (default value) */,
  devServer: (devServerConfig) => {
    const updatedConfig = {
      ...devServerConfig,
      onBeforeSetupMiddleware: function (devServer) {
        devServer.app.use(function (req, res, next) {
          req.headers['Authorization'] = process.env.TC_OIDC_TOKEN;
          next();
        });
      },
      proxy: {
        '/api': {
          target: process.env.DEV_FE_API_PROXY_TARGET,
          changeOrigin: true,
        },
      },
    };

    return updatedConfig;
  },
};
