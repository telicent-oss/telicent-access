import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TeliButton } from "@telicent-oss/ds";

import Topbar from "../lib/Topbar";
import List from "../components/Users/List/List";
import config from "../config/app-config";
import { LookupContext } from "../context/LookupContext";
import { buildError } from "../utils/utils";
import RenderError from "../utils/RenderError";

const Users = () => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError();

    try {
      const options = {
        cachePolicy: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
        },
      };
      const { data } = await axios.get(`${config.url}/users`, options);
      setUserData(data);
    } catch (err) {
      setError(buildError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const refetch = async () => {
    await fetchUsers();
  };

  return (
    <div className="pb-2">
      <Topbar action={<CreateButton setError={setError} />} header="Users" />
      {(loading || error) && (
        <p className="ml-6">
          {loading && "Loading..."}
          {error && RenderError(error)}
        </p>
      )}
      {userData && !error && <List users={userData} refetch={refetch} />}
    </div>
  );
};

const CreateButton = ({ setError }) => {
  const navigate = useNavigate();
  const {
    isScimEnabled: { error, data },
  } = useContext(LookupContext);
  const onCreate = () => {
    navigate("/users/create", { replace: true });
  };

  if (error) {
    setError(error);
  }
  if (data) {
    return null;
  }
  return (
    <TeliButton id="create-group" variant="secondary" onClick={onCreate}>
      Create
    </TeliButton>
  );
};

export default Users;
