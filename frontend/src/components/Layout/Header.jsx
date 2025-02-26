import React from "react"
import { Button, AppBar, UIThemeProvider } from "@telicent-oss/ds";
import packageJson from "../../../package.json";
import config from "../../config/app-config";

const Header = () => (
  <UIThemeProvider dark theme="AdminBlue">
    <div className="shadow-3xl">
      <AppBar
        appName="access"
        endChild={<SignOutButton />}
        version={packageJson.version}
      />
    </div>
  </UIThemeProvider>
);

export default Header;

const SignOutButton = () => {
  const handleSignOut = () => {
    if (config.SIGN_OUT_URL) {
      window.location.href = config.SIGN_OUT_URL;
    }
  };

  if (!config.SIGN_OUT_URL) return null;

  return (
    <Button
      className="ml-auto bg-appColor-hex"
      onClick={handleSignOut}
      variant="primary"
      startIcon={
        <i
          className="fa-solid fa-arrow-right-from-bracket"
          style={{ fontSize: "16px" }}
        />
      }
    >
      Sign Out
    </Button>
  );
};

