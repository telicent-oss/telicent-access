import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import List from "../../Users/List/List";
import config from "../../../config/app-config";
import Topbar from "../../../lib/Topbar";
import { buildError } from "../../../utils/utils";
import RenderError from "../../../utils/RenderError";

const Group = () => {
  const { id } = useParams();
  const [group, setGroup] = useState();
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
      const { data } = await axios.get(`${config.url}/groups/${id}`, options);
      setGroup(data);
    } catch (err) {
      setError(buildError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup, id]);

  return (
    <>
      <Topbar header={`Group - ${group?.label || ""}`} />
      {(loading || error) && (
        <p className="ml-6">
          {loading && "Loading..."}
          {error && RenderError(error)}
        </p>
      )}
      {group && !error && (
        <>
          <div className="mt-4 ml-6">
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

export default Group;
