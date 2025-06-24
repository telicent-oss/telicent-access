import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import Flag from "react-world-flags";
import { TeliButton, TeliChip } from "@telicent-oss/ds";
import api from "../../../utils/api";

import config from "../../../config/app-config";
import { LookupContext } from "../../../context/LookupContext";
import Panel from "../../../lib/Panel";
import { getCountryName, buildError } from "../../../utils/utils";

const Item = ({
  id,
  name,
  email,
  labels,
  active,
  userGroups,
  deletedUser,
  setError,
  isGroupView,
}) => {
  const navigate = useNavigate();
  const { countries } = useContext(LookupContext);
  const { nationality, deployed_organisation, personnel_type, clearance } =
    labels.reduce(
      (acc, { name: labelName, value }) => ({ ...acc, [labelName]: value }),
      {}
    );
  const [loading, setLoading] = useState(false);
  const [allGroupsShown, setAllGroupsShown] = useState(false);
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    const { error, data } = countries;
    if (error) {
      setError(error);
    } else {
      setCountryName(getCountryName(data, nationality));
    }
  }, [countries, nationality, setError]);

  const onNavigateToUpdate = () => {
    navigate(`/users/${id}/update`);
  };

  const onDeleteUsers = async () => {
    setLoading(true);
    setError();

    try {
      const options = {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        cachePolicy: "no-cache",
      };

      await api.delete(`${config.url}/users/${id}`, options);
      deletedUser();
    } catch (err) {
      setError(buildError(err));
    } finally {
      setLoading(false);
    }
  };

  const onDelete = () => {
    confirmAlert({
      title: "Delete User?",
      message: "This removes the user from ACCESS only; to remove the user completely, remove from the IdP group first.",
      buttons: [
        {
          label: "Delete",
          onClick: () => onDeleteUsers(),
        },
        {
          label: "Don't delete",
        },
      ],
    });
  };

  return (
    <Panel ariaLabel="list-item-user" loading={loading}>
      <div className="flex flex-none items-center w-10">
        <div
          className="flex w-10 h-10"
          style={{ color: active ? "green" : "red" }}
          title={active ? "Active user" : "Inactive user"}
        >
          <i className="self-center w-4 fa-regular fa-user" />
        </div>
      </div>
      <div className="flex flex-[20%] items-center min-w-0">
        <div className="w-full">
          <div
            aria-label="text-name"
            className="truncate font-bold"
            title={`Name: ${name}`}
          >
            {name}
          </div>
          <div
            aria-label="text-email"
            className="truncate text-sm"
            title={`Email: ${email}`}
          >
            {email}
          </div>
        </div>
      </div>
      <div
        className="flex flex-none items-center w-24 ml-4 text-lg"
        title={countryName}
      >
        <Flag code={nationality} fallback={<span />} height={24} width={24} />
        <span aria-label="text-nationality" className="ml-2">
          {nationality}
        </span>
      </div>
      <div className="flex flex-[20%] items-center min-w-0 ml-4">
        <div className="w-full">
          <div
            aria-label="text-organisation"
            title={`Organisation: ${deployed_organisation}`}
            className="truncate font-bold"
          >
            {deployed_organisation}
          </div>
          <div
            aria-label="text-personnel-type"
            title={`Personnel type: ${personnel_type}`}
            className="truncate"
          >
            {personnel_type}
          </div>
        </div>
      </div>
      <div
        aria-label="text-clearance"
        className="flex flex-none items-center w-8 ml-4 text-lg font-bold"
        title={`Classification: ${clearance}`}
      >
        {clearance}
      </div>
      <div className="flex flex-[50%] items-center min-w-0 ml-4">
        <div className="flex flex-wrap gap-y-2">
          {userGroups
            .filter((group, i) => (allGroupsShown ? true : i < 3))
            .map((grp) => (
              <TeliChip
                size="small"
                className="max-w-[150px] ml-2"
                key={grp}
                title={grp}
                label={grp.substr(grp.lastIndexOf(":") + 1)}
              />
            ))}
          {userGroups.length > 3 && (
            <TeliButton
              className="h-7 ml-2 px-2 text-sm"
              title={`${allGroupsShown ? "Show fewer" : "Show all"} groups`}
              onClick={() => setAllGroupsShown(!allGroupsShown)}
            >
              {allGroupsShown ? "< less" : "more >"}
            </TeliButton>
          )}
        </div>
      </div>
      {!isGroupView && (
        <div className="flex flex-none items-center pl-4">
          <button
            type="button"
            aria-label="Delete user"
            title="Delete user"
            className="flex w-6 h-6 rounded hover:bg-red-500
            hover:text-black-100"
            onClick={onDelete}
          >
            <i className="w-6 h-6 ri-delete-bin-2-line" />
          </button>
          <button
            type="button"
            aria-label="Edit user"
            title="Edit user"
            className="flex w-6 h-6 ml-4 rounded hover:bg-whiteSmoke
            hover:text-black-100"
            onClick={onNavigateToUpdate}
          >
            <i className="w-6 h-6 ri-pencil-fill" />
          </button>
        </div>
      )}
    </Panel>
  );
};

export default Item;
