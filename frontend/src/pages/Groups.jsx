import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TeliButton } from "@telicent-oss/ds";
import api from "../utils/api";

import Topbar from "../lib/Topbar";
import List from "../components/Groups/List/List";
import config from "../config/app-config";
import { buildError } from "../utils/utils";
import RenderError from "../utils/RenderError";

const Groups = () => {
  const [groupData, setGroupData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    setError();

    try {
      const options = {
        cachePolicy: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
        },
      };
      const { data } = await api.get(`${config.url}/groups`, options);
      setGroupData(data);
    } catch (err) {
      setError(buildError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <>
      <Topbar header="Groups" action={<CreateButton />} />
      {(loading || error) && (
        <p className="ml-6">
          {loading && "Loading..."}
          {error && RenderError(error)}
        </p>
      )}
      {groupData && <List groups={groupData} />}
    </>
  );
};

const CreateButton = () => {
  const navigate = useNavigate();
  const onCreate = () => {
    navigate("/groups/create", { replace: true });
  };

  return (
    <TeliButton id="create-user" variant="secondary" onClick={onCreate}>
      Create
    </TeliButton>
  );
};

export default Groups;
