import React from "react";
import {screen} from "@testing-library/react";
import Header from "./Header";
import { renderWithBrowserRouter } from "../../testUtils";
import packageJson from "../../../package.json"
import config from "../../config/app-config";

describe("Header Component", () => {
    // store SIGN_OUT_URL
    const signOutUrl = config.SIGN_OUT_URL;

    afterEach(() => {
      // restore SIGN_OUT_URL to its original value after each test
      config.SIGN_OUT_URL = signOutUrl;
    });
  

    test("display version number", async () => {
        renderWithBrowserRouter((<Header />));
    
        expect(screen.getByText(packageJson.version)).toBeInTheDocument();
      });

      test("access brand has theme colour", async () => {
        renderWithBrowserRouter(<Header />);
        expect(screen.getByText("ACCESS")).toHaveStyle("color: #20BCFA");
      });

      test("displays sign out button if url is configured", async () => {
        config.SIGN_OUT_URL = "https://signout.test";
    
        renderWithBrowserRouter((<Header />));
    
        expect(config.SIGN_OUT_URL).toBe("https://signout.test");
        expect(
          screen.getByRole("button", { name: "Sign Out" })
        ).toBeInTheDocument();
      });
    
      test("do not displays sign out button if url is NOT configured", async () => {
        config.SIGN_OUT_URL = undefined;
        renderWithBrowserRouter((<Header />));
    
        expect(config.SIGN_OUT_URL).toBe(undefined);
        expect(
          screen.queryByRole("button", { name: "Sign Out" })
        ).not.toBeInTheDocument();
      });

})