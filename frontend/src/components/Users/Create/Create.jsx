import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TeliButton } from "@telicent-oss/ds";

import Form from "../Form/Form";
import config from "../../../config/app-config";
import { LookupContext } from "../../../context/LookupContext";
import Topbar from "../../../lib/Topbar";
import {
  isUserClearanceValid,
  buildError,
  validateEmail,
} from "../../../utils/utils";
import LoadingButton from "../../../utils/LoadingButton";
import RenderError from "../../../utils/RenderError";

const { authType, url } = config;

const Create = () => {
  const navigate = useNavigate();
  const { clearances, countries, isScimEnabled } = useContext(LookupContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const onCreateUser = async (user) => {
    setLoading(true);
    setError();

    let ok = false;
    try {
      const options = {
        cachePolicy: "no-cache",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      };

      await axios.post(`${url}/users/`, user, options);
      ok = true;
    } catch (err) {
      setError(buildError(err));
    } finally {
      setLoading(false);
    }
    return ok;
  };

  const onSubmit = async (user) => {
    if (clearances.error) {
      setError(clearances.error);
    } else if (countries.error) {
      setError(countries.error);
    } else if (isUserClearanceValid(clearances.data?.tiers, user.clearance)) {
      const created = await onCreateUser(user);
      if (created) {
        navigate("/users");
      }
    }
  };

  if (isScimEnabled.data) {
    return (
      <>
        <div className="flex flex-column items-center justify-center h-24 w-full">
          Create functionality is not currently available due to
          {isScimEnabled.error
            ? " an error fetching SCIM status"
            : " SCIM being enabled"}
          .
          <br />
          For new users, add them to your enterprise IdP. Any queries, contact
          your administrator.
        </div>
        <div className="flex items-center justify-center w-full mt-2">
          <TeliButton
            variant="secondary"
            className="hover:text-underline"
            tabIndex={0}
            onClick={() => navigate("/users")}
            onKeyDown={({ key }) => {
              if (key === "Enter") {
                navigate("/users");
              }
            }}
          >
            Return to Users
          </TeliButton>
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar header="Create User" />
      <FormState onSubmit={onSubmit} loading={loading} error={error} />
    </>
  );
};

export const FormState = ({ update, user, onSubmit, loading, error }) => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const basis = {
    name: null,
    email: null,
    active: false,
  };
  if (!update && authType === "keycloak") {
    basis.temporaryPassword = "";
  }
  if (update && user) {
    Object.entries(user).forEach(([k, v]) => {
      if (k === "labels") {
        user[k].forEach(({ name, value }) => {
          basis[name] = value;
        });
      } else {
        basis[k] = v;
      }
    });
  }

  const onSubmitForm = async () => {
    const { current } = formRef;
    const {
      userGroups,
      values,
      values: { name, email, deployed_organisation, temporaryPassword },
    } = current.getValues();
    const userToSubmit = {
      ...values,
      userGroups,
    };

    const isAttemptValid =
      authType === "keycloak" && !update
        ? name &&
          validateEmail(email) &&
          deployed_organisation &&
          temporaryPassword
        : name && validateEmail(email) && deployed_organisation;

    current?.submitAttempted();
    setIsErrorVisible(isAttemptValid);
    if (isAttemptValid) {
      await onSubmit(userToSubmit);
    }
  };

  const onCancel = () => {
    navigate("/users", { replace: true });
  };

  return (
    <Form basis={basis} ref={formRef}>
      <div className="flex space-x-4 mt-5">
        <TeliButton onClick={loading ? undefined : onCancel}>Cancel</TeliButton>
        <LoadingButton
          label={update ? "Update" : "Create"}
          loading={loading}
          onClick={onSubmitForm}
        />
      </div>
      {isErrorVisible && error && RenderError(error)}
    </Form>
  );
};

export default Create;
