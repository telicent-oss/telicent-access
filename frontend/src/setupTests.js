/* eslint-disable import/no-extraneous-dependencies */
import { configure } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-canvas-mock";
import { setupServer } from "msw/node";

import handlers from "./mocks/handlers";

global.ResizeObserver = require("resize-observer-polyfill");

global.URL.createObjectURL = jest.fn();

export const access = "http://localhost:8092";

global.window._env_ = {
  ACCESS_API_URL: access,
  BETA: true,
};

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
