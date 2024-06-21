import React, { useCallback, useState } from "react";

import Item from "./Item";
import Select from "../../Select/Select";
import config from "../../../config/app-config";
import { sortPartial } from "../../../utils/utils";

const List = ({ groups }) => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    sortBy: "label",
    isSortDescend: false,
  });
  const { searchTerm, sortBy, isSortDescend } = filters;

  const onSearchChange = ({ target: { value } }) => {
    setFilters((prev) => ({ ...prev, searchTerm: value }));
  };

  const onSortChange = ({ target: { value } }) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
  };

  const handleSortDirection = () => {
    setFilters((prev) => ({ ...prev, isSortDescend: !prev.isSortDescend }));
  };

  const bySearchTerm = useCallback(
    (group) => {
      if (searchTerm === "") return true;
      return group.label.toLowerCase().includes(searchTerm.toLowerCase());
    },
    [searchTerm]
  );

  const sortGroups = useCallback(
    (a, b) => {
      const sortByName = sortPartial(sortBy, isSortDescend);
      return sortByName(a, b);
    },
    [isSortDescend, sortBy]
  );

  const filteredGroups = groups.filter(bySearchTerm).sort(sortGroups);

  if (groups.length === 0) {
    return <p className="mt-4 ml-6">No groups found.</p>;
  }

  return (
    <>
      <div className="sticky items-center justify-between mb-2 px-6 py-4 z-10">
        <div className="flex items-center gap-4">
          <span className="flex flex-col items-start">
            <label
              htmlFor="search"
              className="mr-2 text-xs font-thin uppercase"
            >
              Filter
            </label>
            <input
              id="search"
              className="h-10 px-2 bg-black-100 border rounded-md
              border-gray-400"
              placeholder="SEARCH..."
              onChange={onSearchChange}
            />
          </span>
          <span className="flex flex-col items-start">
            <label htmlFor="sort" className="mr-2 text-xs font-thin uppercase">
              Sort by
            </label>
            <div>
              <Select
                id="sort"
                options={config.groupProperties}
                isSort
                onChange={onSortChange}
              />
              <button
                type="button"
                aria-label="Reverse sort order"
                title="Reverse sort order"
                className="ml-1 px-2 pt-0.5 hover:bg-whiteSmoke
                hover:text-black-100 border rounded border-gray-400"
                onClick={() => handleSortDirection()}
              >
                <i className={`ri-sort-${isSortDescend ? "desc" : "asc"}`} />
              </button>
            </div>
          </span>
        </div>
      </div>
      {filteredGroups.length === 0 && (
        <p className="px-6">
          No groups matching your filters. Try making the filters less specific.
        </p>
      )}
      <ul className="px-6">
        {filteredGroups.map(
          ({ _id, group_id, label, description, active, userCount }) => (
            <Item
              key={_id}
              hexId={_id}
              id={group_id}
              name={label}
              description={description}
              active={active}
              userCount={userCount}
            />
          )
        )}
      </ul>
    </>
  );
};

export default List;
