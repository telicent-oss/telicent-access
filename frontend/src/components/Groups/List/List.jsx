import React, { useCallback, useState } from "react";

import Item from "./Item";
import { sortPartial } from "../../../utils/utils";
import useSortBy from "../../Select/useSortBy";
import SortBy from "../../Select/SortBy";
import config from "../../../config/app-config";

const List = ({ groups }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { sortBy, ascend, handleSortByChange, handleSortDirection } = useSortBy(
    { defaultValue: "label" }
  );

  const onSearchChange = ({ target: { value } }) => {
    setSearchTerm(value);
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
      const sortByName = sortPartial(sortBy, ascend);
      return sortByName(a, b);
    },
    [ascend, sortBy]
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
          <SortBy
            selectId="sort-groups"
            value={sortBy}
            isAscending={ascend}
            options={config.groupProperties}
            onSortChange={handleSortByChange}
            onSortDirectionChange={handleSortDirection}
          />
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
