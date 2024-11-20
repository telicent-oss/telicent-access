import React, { useCallback, useContext, useEffect, useState } from "react";

import Item from "./Item";
import Select from "../../Select/Select";
import config from "../../../config/app-config";
import { LookupContext } from "../../../context/LookupContext";
import {
  getCountryName,
  getAlpha2,
  getLabel,
  sort,
  sortPartialLabels,
  sortPartial,
} from "../../../utils/utils";
import RenderError from "../../../utils/RenderError";
import SortBy from "../../Select/SortBy";
import useSortBy from "../../Select/useSortBy";

import "react-confirm-alert/src/react-confirm-alert.css";
import "./List.css";

const List = ({ users = [], isGroupView, refetch }) => {
  const { countries } = useContext(LookupContext);

  const { sortBy, ascend, handleSortByChange, handleSortDirection } = useSortBy(
    { defaultValue: "name" }
  );

  const [err, setErr] = useState();
  const [nationalities, setNationalities] = useState([]);
  const [clearances, setClearances] = useState([]);
  const [filters, setFilters] = useState({
    nationality: "all",
    clearance: "all",
    searchTerm: "",
  });
  const { nationality, clearance, searchTerm } = filters;

  const onSearchChange = ({ target: { value } }) => {
    setFilters((prev) => ({ ...prev, searchTerm: value }));
  };

  const byNationality = useCallback(
    ({ labels }) =>
      nationality === "all" ||
      (nationality === "Not set" &&
        !labels.find(({ name }) => name === "nationality")?.value) ||
      labels
        .filter(({ name }) => name === "nationality")
        .find(({ value }) => value === nationality),
    [nationality]
  );

  const byClearance = useCallback(
    ({ labels }) =>
      clearance === "all" ||
      (clearance === "Not set" &&
        !labels.find(({ name }) => name === "clearance")?.value) ||
      labels
        .filter(({ name }) => name === "clearance")
        .find(({ value }) => value === clearance),
    [clearance]
  );

  const bySearchTerm = useCallback(
    ({ name, email }) =>
      searchTerm === "" ||
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()),
    [searchTerm]
  );

  const sortUsers = useCallback(
    (a, b) =>
      sortBy === "name" || sortBy === "email" || sortBy === "active"
        ? sortPartial(sortBy, ascend)(a, b)
        : sortPartialLabels(sortBy, ascend)(a, b),
    [ascend, sortBy]
  );

  const filteredUsers = users
    .filter(byNationality)
    .filter(bySearchTerm)
    .filter(byClearance)
    .sort(sortUsers);

  useEffect(() => {
    const { error, data } = countries;
    if (error) {
      setErr(error);
    } else {
      (async () => {
        setNationalities(
          sort(
            [
              ...new Set(
                users.map(
                  ({ labels }) =>
                    labels?.find(({ name }) => name === "nationality")?.value ||
                    "Not set"
                )
              ),
            ].map((item) => ({
              value: item,
              label: getCountryName(data, item),
              alpha2: getAlpha2(data, item),
            })),
            "label"
          )
        );
      })();
    }
  }, [users, countries]);

  useEffect(() => {
    setClearances(
      sort(
        [
          ...new Set(
            users.map(
              ({ labels }) =>
                labels?.find(({ name }) => name === "clearance")?.value ||
                "Not set"
            )
          ),
        ].map((item) => ({
          value: item,
          label: getLabel("classification", item),
        })),
        "value"
      )
    );
  }, [users]);

  const onDelete = () => {
    refetch();
  };

  const onFilterChange = (filter) => (event) => {
    const { value } = event.target;

    if (filter === "nationality") {
      setFilters((prev) => ({ ...prev, nationality: value }));
    }
    if (filter === "clearance") {
      setFilters((prev) => ({ ...prev, clearance: value }));
    }
  };
  

  if (!users.length) {
    return <p className="mt-4 ml-6">No users found.</p>;
  }

  return (
    <>
      <div className="px-6 py-4 mb-2">
        <div className="flex items-center gap-4">
          <span className="flex flex-col">
            <label
              htmlFor="search"
              className="mr-2 text-xs font-thin uppercase"
            >
              Filter
            </label>
            <input
              id="search"
              className="h-10 px-2 bg-black-100 border rounded-md border-gray-400"
              placeholder="SEARCH..."
              onChange={onSearchChange}
            />
          </span>
          <span className="flex flex-col">
            <label
              htmlFor="nationality"
              className="text-xs font-thin uppercase"
            >
              Nationality
            </label>
            <Select
              id="nationality"
              options={nationalities}
              selectedValue={filters.nationality}
              onChange={onFilterChange("nationality")}
              includeAll
              isNationality
            />
          </span>
          <span className="flex flex-col">
            <label htmlFor="clearance" className="text-xs font-thin uppercase">
              Classification
            </label>
            <Select
              id="clearance"
              selectedValue={filters.clearance}
              options={clearances}
              onChange={onFilterChange("clearance")}
              includeAll
            />
          </span>
          <SortBy
            selectId="sort-users"
            value={sortBy}
            isAscending={ascend}
            options={config.userProperties}
            onSortChange={handleSortByChange}
            onSortDirectionChange={handleSortDirection}
          />
        </div>
      </div>
      {!filteredUsers.length && (
        <p className="px-6">
          No users matching your filters. Try making the filters less specific.
        </p>
      )}
      <ul className="px-6">
        {filteredUsers.map(
          ({ id, name, email, labels, active, userGroups }) => (
            <Item
              key={id}
              id={id}
              name={name}
              email={email}
              labels={labels?.filter((label) => label.name !== "email")}
              active={active}
              userGroups={userGroups.sort(Intl.Collator().compare)}
              deletedUser={onDelete}
              setError={setErr}
              isGroupView={isGroupView}
            />
          )
        )}
        {err && RenderError(err)}
      </ul>
    </>
  );
};

export default List;
