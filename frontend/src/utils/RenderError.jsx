/* eslint-disable react/destructuring-assignment */
import React from "react";
import config from "../config/app-config";

const RenderError = ({ code, message }, fallback) => {
  const { url } = config;
  const configErr = !url || url === "undefined";
  const errCode = configErr ? "" : code;
  const msg = configErr
    ? "URL missing from config. Check .env file exists."
    : message;

  return (
    <div className="mt-2 text-red-400">
      {(errCode || msg) && (
        <p>
          Error: {errCode} <br /> {msg}
        </p>
      )}
      {!errCode && !msg && (
        <p>
          Error: {fallback?.name} <br /> {fallback?.message}
          {!fallback?.name && !fallback?.message && "Unspecified error"}
        </p>
      )}
    </div>
  );
};

export default RenderError;
