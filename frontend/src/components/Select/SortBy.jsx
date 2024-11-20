import React from "react";
import Select from "./Select";

const SortBy = ({
  selectId,
  value,
  isAscending,
  options,
  onSortChange,
  onSortDirectionChange,
}) => (
  <div className="flex flex-col items-start">
    <label htmlFor="sort" className="mr-2 text-xs font-thin uppercase">
      Sort by
    </label>
    <div className="flex items-center">
      <Select
        id={selectId}
        selectedValue={value}
        options={options}
        isSort
        onChange={onSortChange}
      />
      <button
        type="button"
        aria-label="Reverse sort order"
        title="Reverse sort order"
        className="ml-1 px-2 pt-0.5 hover:bg-whiteSmoke hover:text-black-100 border rounded border-gray-400"
        onClick={onSortDirectionChange}
      >
        <i className={`ri-sort-${isAscending ? "desc" : "asc"}`} />
      </button>
    </div>
  </div>
);

export default SortBy;
