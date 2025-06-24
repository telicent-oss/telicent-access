/* eslint-disable import/no-extraneous-dependencies */
import { configure } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-canvas-mock";
import { setupServer } from "msw/node";

import handlers from "./mocks/handlers";

global.ResizeObserver = require("resize-observer-polyfill");

global.URL.createObjectURL = jest.fn();

export const access = "http://localhost:8091";

jest.mock("../package.json", () => ({
  version: "x.y.z",
}));

export const server = setupServer(...handlers(access));

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

configure({ testIdAttribute: "id" });
globalThis.BroadcastChannel = class {
  constructor(channelName) {
    this.name = channelName;
  }

  name;
  onmessage;

  postMessage = (_) => {
    // no-op or you can log for debug
  };

  close = () => {
    // no-op
  };

  addEventListener = (type, listener) => {
    if (type === "message") this.onmessage = listener;
  };

  removeEventListener = (type, _) => {
    if (type === "message") this.onmessage = null;
  };
};
