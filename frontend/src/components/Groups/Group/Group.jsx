/* eslint-disable arrow-body-style */
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TeliButton } from "@telicent-oss/ds";
import { confirmAlert } from "react-confirm-alert";
import api from "../../../utils/api";

import List from "../../Users/List/List";
import config from "../../../config/app-config";
import Topbar from "../../../lib/Topbar";
import { buildError } from "../../../utils/utils";
import RenderError from "../../../utils/RenderError";

const Group = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [group, setGroup] = useState();
  const [active, setActive] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchGroup = useCallback(async () => {
    setLoading(true);
    setError();

    try {
      const options = {
        cachePolicy: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
        },
      };
      const { data } = await api.get(`${config.url}/groups/${id}`, options);
      setGroup(data);
      setActive(data.active);
    } catch (err) {
      setError(buildError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup, id]);

  const toggleActive = async () => {
    try {
      const options = {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        cachePolicy: "no-cache",
      };

      const { data } = await api.patch(
        `${config.url}/groups/${id}/toggle-active`,
        options
      );
      setActive(data?.active);
    } catch (err) {
      setError(buildError(err));
    }
  };

  const onToggleActive = () => {
    if (active) {
      confirmAlert({
        title: "Deactivate Group?",
        buttons: [
          {
            label: "Deactivate",
            onClick: () => toggleActive(),
          },
          {
            label: "Cancel",
          },
        ],
      });
    } else {
      toggleActive();
    }
  };

  const deleteGroup = async () => {
    try {
      const options = {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        cachePolicy: "no-cache",
      };

      await api.delete(`${config.url}/groups/${id}`, options);
      navigate("/groups");
    } catch (err) {
      setError(buildError(err));
    }
  };
  const onDeleteGroup = () => {
    confirmAlert({
      title: "Delete Group?",
      message:
        "Deleting this group will mean it will no longer be useable across the system. \n This may have an impact on users and data. For example if this group is implemented as an AND group on a piece of data, the data will be rendered unreachable.",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteGroup(),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const renderActions = () => {
    return (
      <div className="flex gap-4">
        <GroupButton
          label={active ? "Deactivate" : "Activate"}
          id="toggle-activation"
          cb={onToggleActive}
        />
        <GroupButton
          label="Delete"
          id="delete-group"
          tooltip="Group cannot be deleted unless deactivated"
          disabled={active}
          icon={<i className="w-6 h-6 ri-delete-bin-2-line text-red-500" />}
          cb={onDeleteGroup}
        />
      </div>
    );
  };

  return (
    <>
      <Topbar
        header={`Group - ${group?.label || ""}`}
        action={renderActions()}
      />
      {(loading || error) && (
        <p className="ml-6">
          {loading && "Loading..."}
          {error && RenderError(error)}
        </p>
      )}
      {group && !error && (
        <>
          <div className="mt-4 ml-6">
            <div className="flex">
              <span
                className=" w-10 h-10"
                style={{ color: active ? "green" : "red" }}
                title={active ? "Active group" : "Inactive group"}
              >
                <i className="self-center w-4 fa-solid fa-layer-group" />
              </span>
              {active ? "Active" : "Inactive"}
            </div>
            <div>
              <span className="font-bold">ID:</span> {group.group_id}
            </div>
            <div>
              <span className="font-bold">Description:</span>{" "}
              {group.description}
            </div>
            <div className="mt-6 text-2xl font-bold">Users</div>
          </div>
          <List users={group.users} isGroupView />
        </>
      )}
    </>
  );
};

const GroupButton = ({ cb, label, icon, tooltip, id, disabled }) => {
  return (
    <span data-tip={tooltip} data-tip-disable={!disabled}>
      <TeliButton id={id} variant="secondary" onClick={cb} disabled={disabled}>
        {icon} {label}
      </TeliButton>
    </span>
  );
};
export default Group;
