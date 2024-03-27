import jws from "jws";
import axios from "axios";

import config from "../config";

const { debug, jwtHeader } = config;

export default (url) => {
  let keyUrl = url;
  let provider;
  if (url === "development") {
    console.log("ACCESS started in development mode, no tokens required.");
  } else if (url?.startsWith("aws:")) {
    const [_, region] = url.split(":");
    keyUrl = `https://public-keys.auth.elb.${region}.amazonaws.com`;
    provider = "aws";
    console.log(`AWS Public Keys configured in region: ${region}`);
  }
  return decodeFn(keyUrl, provider);
};

const decodeFn = (url, provider) => async (req, res, next) => {
  if (url === "development") {
    req.token = {
      email: "test@telicent.io",
      username: "8edae5a0-1f5a-466f-b58e-64c611f31722",
      sub: "8edae5a0-1f5a-466f-b58e-64c611f31722",
    };
    return next();
  } else if (!url || !req?.headers[jwtHeader]) {
    return res.status(401).send();
  }

  let token = req.headers[jwtHeader];
  if (jwtHeader === "Authorization") {
    token = token.split("Bearer ")[1];
  }
  if (provider === "aws") {
    const [payload, err] = await verifyToken(url, token);
    if (debug) {
      console.log("Token, URL", token, url);
    }
    if (err) {
      console.log(err.message);
      return res.status(403).send();
    }
    req.token = payload;
  } else {
    console.log("Auth provider not supported.");
    return res.status(401).send();
  }

  next();
};

const verifyToken = async (url, token) => {
  const [header, pload] = token.split(".");
  const { kid, alg } = JSON.parse(
    Buffer.from(header, "base64").toString("utf-8")
  );
  const payload = JSON.parse(Buffer.from(pload, "base64").toString("utf-8"));

  const [publicKey, err] = await fetchKey(url, kid);
  if (err) {
    return [null, err];
  }
  const isVerified = jws.verify(token, alg, publicKey);
  if (debug) {
    console.log("PK, ALG, isVerified: ", publicKey, alg, isVerified);
  }
  if (isVerified) {
    return [payload];
  } else {
    return [null, new Error("token not verified")];
  }
};

const fetchKey = async (url, kid) => {
  try {
    const { data } = await axios.get(`${url}/${kid}`);
    return [data];
  } catch (error) {
    return [null, error];
  }
};
