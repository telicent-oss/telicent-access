/* eslint import/prefer-default-export:0 */
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TeliButton } from "@telicent-oss/ds";

import Form from "../Form/Form";
import config from "../../../config/app-config";
import { validateEmail } from "../../../utils/utils";
import LoadingButton from "../../../utils/LoadingButton";
import RenderError from "../../../utils/RenderError";

const { authType } = config;

export const FormState = ({ update, user, onSubmit, loading, error }) => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const basis = {
    name: null,
    email: null,
    active: false,
  };

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
      values: { name, email, deployed_organisation, temporary_password },
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
          temporary_password
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
