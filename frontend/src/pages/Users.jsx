import React, { useEffect, useCallback, useState } from "react";
import api from "../utils/api";
import List from "../components/Users/List/List";
import config from "../config/app-config";
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
      const { data } = await api.get(`${config.url}/users`, options);
      setUserData(data);
    } catch (err) {
      console.log('user error', err);
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

export default Users;
