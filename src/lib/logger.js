import config from "../config";

const logger = {
  debug: (msg) => {
    if (config.debug === true) {
      console.log(`DEBUG: ${msg}`);
    }
  },
  info: (msg) => {
    console.log(`%c INFO: ${msg}`, "color: green");
  },
  warn: (msg) => {
    console.warn(`%c WARN: ${msg}`, "color: yellow");
  },
  error: (msg) => {
    console.log(`%c ERROR: ${msg}`, "color: red");
  },
};

export default logger;
