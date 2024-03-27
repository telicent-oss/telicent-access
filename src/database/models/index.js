import fs from "fs";

export default () => {
  const models = `${__dirname}/`;
  fs.readdirSync(models)
    .filter((model) => model !== "index.js")
    .forEach((model) => {
      require(`./${model}`);
    });
};
