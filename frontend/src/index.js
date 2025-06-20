/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { UIThemeProvider, AuthModal, getChannel } from "@telicent-oss/ds";
import App from "./App";
import { LookupProvider } from "./context/LookupContext";
import config from "./config/app-config";

import "@telicent-oss/ds/dist/style.css";
import "@telicent-oss/ds/dist/fontawesome.css";
import "./main.css";
import "./font.css";

const container = document.getElementById("root");

if (/windows/i.test(navigator.userAgent)) {
  container.classList.add("win");
}
console.log('channel', getChannel());
createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter basename="/access">
      <LookupProvider>
        <div>
          <UIThemeProvider dark theme="Blank">
            {config.SIGN_OUT_URL ? (
              <AuthModal signOutUrl={config.SIGN_OUT_URL} />
            ) : (
              "WARNING: Expected SIGN_OUT_URL"
            )}
          </UIThemeProvider>
          <App />
        </div>
      </LookupProvider>
    </BrowserRouter>
  </React.StrictMode>
);
