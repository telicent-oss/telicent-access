/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { LookupProvider } from "./context/LookupContext";

import "@telicent-oss/ds/dist/style.css";
import "@telicent-oss/ds/dist/fontawesome.css";
import "./main.css";
import "./font.css";

const container = document.getElementById("root");

if (/windows/i.test(navigator.userAgent)) {
  container.classList.add("win");
}

createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter basename="/access">
      <LookupProvider>
        <App />
      </LookupProvider>
    </BrowserRouter>
  </React.StrictMode>
);
