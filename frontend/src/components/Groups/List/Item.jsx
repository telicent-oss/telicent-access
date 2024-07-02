import React from "react";
import { useNavigate } from "react-router-dom";

import Panel from "../../../lib/Panel";

const Item = ({ id, hexId, name, description, active, userCount }) => {
  const navigate = useNavigate();

  return (
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/groups/${hexId}`)}
    >
      <Panel ariaLabel="tile-group">
        <div className="w-full">
          <div className="flex">
            <div className="flex flex-none items-center w-10">
              <div
                className="flex w-10 h-10"
                style={{ color: active ? "green" : "red" }}
                title={active ? "Active group" : "Inactive group"}
              >
                <i className="self-center w-4 fa-solid fa-layer-group" />
              </div>
            </div>
            <div className="flex flex-[35%] items-center min-w-0">
              <div className="w-full">
                <div
                  aria-label="text-name"
                  className="truncate font-bold"
                  title={`Name: ${name}`}
                >
                  {name}
                </div>
                <div
                  aria-label="text-id"
                  className="truncate text-sm"
                  title={`ID: ${id}`}
                >
                  {id}
                </div>
              </div>
            </div>
            <div className="flex flex-[55%] items-center min-w-0 ml-4">
              <span
                aria-label="text-description"
                className="truncate"
                title={`Description: ${description}`}
              >
                {description}
              </span>
            </div>
            <div
              aria-label="text-user-count"
              className="flex flex-none items-center min-w-12 ml-4 text-lg font-bold"
              title={`User count: ${userCount}`}
            >
              {userCount}
              <i className="fa-solid fa-users ml-4 mr-1" />
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default Item;
