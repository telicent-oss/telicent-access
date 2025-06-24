import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TeliButton,
} from "@telicent-oss/ds";
import api from "../../../utils/api";

import FormInput from "../../Users/Form/FormInput";
import config from "../../../config/app-config";
import Textarea from "../../../lib/Textarea";
import Topbar from "../../../lib/Topbar";
import { buildError } from "../../../utils/utils";
import LoadingButton from "../../../utils/LoadingButton";
import RenderError from "../../../utils/RenderError";

const CreateGroup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const onCreateGroup = async (group) => {
    setLoading(true);
    setError();

    let ok = false;
    try {
      const options = {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        cachePolicy: "no-cache",
      };

      await api.post(`${config.url}/groups/`, group, options);
      ok = true;
    } catch (err) {
      setError(buildError(err));
    } finally {
      setLoading(false);
    }
    return ok;
  };

  const onSubmit = async (group) => {
    const created = await onCreateGroup(group);
    if (created) {
      navigate("/groups");
    }
  };

  return (
    <>
      <Topbar header="Create Group" />
      <CreateGroupForm onSubmit={onSubmit} loading={loading} error={error} />
    </>
  );
};

const CreateGroupForm = ({ onSubmit, error, loading }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitForm = async () => {
    const group = {
      label: name,
      description: description.trim(),
    };
    await onSubmit(group);
  };

  const onNameChange = (evt) => {
    const {
      target: { value },
    } = evt;
    setName(value.trim());
  };

  const onDescriptionChange = ({ target: { value } }) => {
    setDescription(value);
  };

  const onCancel = () => {
    navigate("/groups", { replace: true });
  };

  return (
    <form className="flex flex-col max-w-xl px-6 py-4">
      <FormInput
        id="name"
        label="name"
        value={name}
        autoFocus
        onChange={onNameChange}
      />
      <Textarea
        id="description"
        label="description"
        value={description}
        required
        onChange={onDescriptionChange}
      />
      <div className="flex self-end mt-5 space-x-4">
        <TeliButton onClick={onCancel}>Cancel</TeliButton>
        <LoadingButton
          label="Create"
          loading={loading}
          disabled={!name.trim() || !description.trim()}
          onClick={onSubmitForm}
        />
      </div>

      {error && RenderError(error)}
    </form>
  );
};

export default CreateGroup;
