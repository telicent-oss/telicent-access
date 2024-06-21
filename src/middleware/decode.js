import axios from "axios";

const ADMIN_GROUP = "tc_admin";
const USER_GROUP = "tc_read";
const DEV_TOKEN_HEADER = "authorization";
class DecodeJWT {
  constructor(url, header, groupKey) {
    if (!url) {
      throw new Error("OpenID provider is undefined and is required.");
    }

    this.development = url === "development";
    this.url = url;
    this.groupKey = groupKey;
    this.header = header;
  }

  initialize = async () => {
    if (this.development) {
      this.openid_configuration = null;
      return null;
    }
    try {
      const { data } = await axios.get(
        `${this.url}/.well-known/openid-configuration`
      );
      this.openid_configuration = data;
      return null;
    } catch (error) {
      throw new OpenIDConfigError(error.code, error.message);
    }
  };

  middleware = async (req, res, next) => {
    if (this.development) {
      this.devMiddleware(req, res);
      return next();
    }
    let token = req.header(this.header);
    if (token.toLowerCase().startsWith("bearer ")) {
      const parts = token.split(" ");
      if (parts.length !== 2) {
        return res.status(401).send();
      }
      token = parts[1];
    }

    const [payload, err] = await this.verifyToken(token);
    if (err) {
      return res.status(403).send();
    }
    req.token = payload;
    req.isAdmin = req.token[this.groupKey].includes(ADMIN_GROUP);
    req.isUser = req.token[this.groupKey].includes(USER_GROUP);

    return next();
  };

  verifyToken = async (token) => {
    var jwt = require("jsonwebtoken");
    var jwkToPem = require("jwk-to-pem");
    const [h] = token.split(".");
    const { kid, alg } = JSON.parse(Buffer.from(h, "base64").toString("utf-8"));

    try {
      const [data, error] = await this.fetchKeys(
        this.openid_configuration.jwks_uri
      );
      if (error) {
        return [null, error];
      }
      var pem = jwkToPem(data.keys.find((key) => key.kid === kid));
      let decodedToken = jwt.verify(token, pem, { algorithms: alg });
      return [decodedToken, null];
    } catch (err) {
      return [null, err];
    }
  };
  fetchKeys = async (url) => {
    try {
      const { data } = await axios.get(`${url}`);
      return [data];
    } catch (error) {
      return [null, error];
    }
  };

  devMiddleware = async (req, res) => {
    if (req.header(DEV_TOKEN_HEADER)) {
      // dev header must be a bearer token
      const parts = req.header(DEV_TOKEN_HEADER).split(" ");
      if (parts.length !== 2) {
        return res.status(401).send();
      }
      const token = parts[1];
      const [_, pload] = token.split(".");
      const payload = JSON.parse(
        Buffer.from(pload, "base64").toString("utf-8")
      );
      req.token = payload;
    } else {
      req.token = {
        email: "test+dev@telicent.io",
        username: "8edae5a0-1f5a-466f-b58e-64c611f31722",
        sub: "8edae5a0-1f5a-466f-b58e-64c611f31722",
        [this.groupKey]: [ADMIN_GROUP, USER_GROUP],
      };
    }
    req.isAdmin = req.token[this.groupKey].includes(ADMIN_GROUP);
    req.isUser = req.token[this.groupKey].includes(USER_GROUP);
    return;
  };
}
class OpenIDConfigError extends Error {
  constructor(code, details) {
    super("Unable to retrieve openid-configuration");
    this.code = code;
    this.details = details;
  }
}

export default DecodeJWT;
