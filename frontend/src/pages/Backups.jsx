import React from "react";


import Topbar from "../lib/Topbar";
import SCs from "../components/Backups/SCs";

const Backups = () => {

    return (
        <>
            <Topbar header="Backups (EXPERIMENTAL - PREVIEW)" />
            <SCs />
        </>
    );
};



export default Backups;