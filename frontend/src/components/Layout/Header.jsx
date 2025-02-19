import React from "react"
import { Button, TeliBrand } from "@telicent-oss/ds";
import packageJson from "../../../package.json"
import config from "../../config/app-config";



const Header = () => {
  const handleSignOut = () => {
    if (config.SIGN_OUT_URL) {
      window.location.href = config.SIGN_OUT_URL;
    }
   
  };
  
return (

  <div className="relative flex h-[64px] items-center bg-black-100 px-4 shadow-3xl">
   <div className="absolute flex items-baseline gap-2 -translate-x-1/2 left-1/2">
    <TeliBrand appName="access" className="items-baseline p-1" />
      {packageJson.version}
   </div>
   {config.SIGN_OUT_URL &&  <Button className="ml-auto bg-appColor-hex" onClick={handleSignOut} 
    variant="primary" 
    startIcon={<i className="fa-solid fa-arrow-right-from-bracket" style={{ fontSize: "16px" }} />
  }>
      Sign Out
    </Button>}
   

  </div>

  )
}

export default Header

