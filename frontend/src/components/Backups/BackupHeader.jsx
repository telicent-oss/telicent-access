import React from "react"

const BackupHeader = ({ name, type }) => (
    <div className=" flex ">
        <i className="fa-solid fa-database m-4 text-xl" />
        <div>
            <h1 className="text-2xl">{name}</h1>
            <small>{type}</small>
        </div>
    </div>
)

export default BackupHeader;