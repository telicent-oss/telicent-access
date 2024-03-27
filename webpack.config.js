module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "telicent-access-api.dist.js",
  },
  module: {
    rules: [
      {
        test: /\/__tests__\/\.test\.jsx?$/,
        exclude: ["node_modules", "frontend"],
        use: ["babel-loader"],
      },
    ],
  },
};
