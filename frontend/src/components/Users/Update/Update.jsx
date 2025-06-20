import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/api";

import { FormState } from "../Create/Create";
import config from "../../../config/app-config";
import { LookupContext } from "../../../context/LookupContext";
import Topbar from "../../../lib/Topbar";
import { isUserClearanceValid, buildError } from "../../../utils/utils";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { url } = config;
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { clearances, countries } = useContext(LookupContext);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError();

    try {
      const options = {
        cachePolicy: "no-cache",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      };
      const { data } = await api.get(`${url}/users/${id}`, options);
      setUserData(data);
    } catch (err) {
      setError(buildError(err));
    } finally {
      setLoading(false);
    }
  }, [id, url]);

  useEffect(() => {
    fetchUsers();
  }, [id, fetchUsers]);

  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState();
  const onPatch = async (body) => {
    setUpdateLoading(true);
    setUpdateError();

    try {
      const options = {
        cachePolicy: "no-cache",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      };

      await api.patch(`${url}/users/${id}`, body, options);
      return { ok: true };
    } catch (err) {
      setUpdateError(buildError(err));
      return { ok: false };
    } finally {
      setUpdateLoading(false);
    }
  };

  if (error) {
    setTimeout(() => {
      navigate("/users", { replace: true });
    }, 5000);

    return (
      <p>
        Error retrieving data for user: {id}. Navigating back to home screen in
        5 seconds.
      </p>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData && !error && !loading) {
    return null;
  }

  const onSubmit = async (user) => {
    if (clearances.error) {
      setUpdateError(clearances.error);
    } else if (countries.error) {
      setUpdateError(countries.error);
    } else if (isUserClearanceValid(clearances.data?.tiers, user.clearance)) {
      const { ok } = await onPatch(user);

      if (ok) {
        navigate("/users", { replace: true });
      }
    }
  };

  return (
    <>
      <Topbar header={`Update User - ${userData.name}`} />
      <FormState
        id={userData.id}
        user={userData}
        update
        onSubmit={onSubmit}
        loading={updateLoading}
        error={updateError}
      />
    </>
  );
};

export default Update;
