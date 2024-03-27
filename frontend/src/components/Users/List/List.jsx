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

import "react-confirm-alert/src/react-confirm-alert.css";
import "./List.css";

const List = ({ users = [], isGroupView, refetch }) => {
  const { countries } = useContext(LookupContext);
  const [err, setErr] = useState();
  const [nationalities, setNationalities] = useState([]);
  const [clearances, setClearances] = useState([]);
  const [filters, setFilters] = useState({
    nationality: "all",
    clearance: "all",
    searchTerm: "",
    sortBy: "name",
    isSortDescend: false,
  });
  const { nationality, clearance, searchTerm, sortBy, isSortDescend } = filters;

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
        ? sortPartial(sortBy, isSortDescend)(a, b)
        : sortPartialLabels(sortBy, isSortDescend)(a, b),
    [isSortDescend, sortBy]
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

  const onFilterChange = ({ currentTarget: { id }, target: { value } }) => {
    if (id === "nationality") {
      setFilters((prev) => ({ ...prev, nationality: value }));
    }
    if (id === "clearance") {
      setFilters((prev) => ({ ...prev, clearance: value }));
    }
  };

  const onSortChange = ({ target: { value } }) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
  };

  const handleSortDirection = () => {
    setFilters((prev) => ({ ...prev, isSortDescend: !prev.isSortDescend }));
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
              onChange={onFilterChange}
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
              options={clearances}
              onChange={onFilterChange}
              includeAll
            />
          </span>
          <span className="flex flex-col">
            <label htmlFor="sort" className="mr-2 text-xs font-thin uppercase">
              Sort by
            </label>
            <div>
              <Select
                id="sort"
                options={config.userProperties}
                onChange={onSortChange}
                isSort
              />
              <button
                type="button"
                aria-label="Reverse sort order"
                title="Reverse sort order"
                className="ml-1 px-2 pt-0.5 hover:bg-whiteSmoke
                hover:text-black-100 border rounded border-gray-400"
                onClick={handleSortDirection}
              >
                <i className={`ri-sort-${isSortDescend ? "desc" : "asc"}`} />
              </button>
            </div>
          </span>
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
