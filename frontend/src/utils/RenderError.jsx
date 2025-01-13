/* eslint-disable react/destructuring-assignment */
import React from "react";
import config from "../config/app-config";

const RenderError = ({ code, message }, fallback) => {
  const { url } = config;
  const configErr = !url || url === "undefined";
  const errCode = configErr ? "" : `Request fail with status code ${code}`;
  const msg = configErr
    ? "URL missing from config. Check .env file exists."
    : message;

  return (
    <div
      id="toast-default"
      className="flex max-w-lg p-4 mt-4 rounded-lg shadow w-fit dark:bg-black"
      role="alert"
    >
      <div className="mt-2 w-[22px] h-[22px] rounded-full grow-0 shrink-0 border-errorMain border-2 flex items-center justify-center">
        <i className="p-2 m-2 text-lg font-bold text-errorMain fa-solid fa-exclamation" />
      </div>
      {(errCode || msg) && (
        <div>
          <p className="font-bold text-white text-md ms-3">{msg}</p>
          <p className="text-sm font-normal ms-3">{errCode}</p>
        </div>
      )}

      {!errCode && !msg && (
        <div>
          <p className="font-bold text-white text-md ms-3">
            {fallback?.message}
          </p>
          <p className="text-sm font-normal ms-3">
            {!fallback?.name && !fallback?.message && "Unspecified error"}
          </p>
        </div>
      )}
    </div>
  );
};


export default RenderError;
