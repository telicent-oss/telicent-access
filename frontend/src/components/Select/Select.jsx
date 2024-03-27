import React, { useEffect, useState } from "react";
import flag from "country-code-emoji";

const Select = ({
  id,
  options,
  onChange,
  includeAll,
  selectedValue,
  placeholder,
  isNationality,
  isSort,
}) => {
  const [displayedOptions, setDisplayedOptions] = useState(options);

  useEffect(() => {
    setDisplayedOptions(options);
  }, [options]);

  return (
    <div className="relative inline-block w-auto">
      <div className="flex">
        <select
          id={id}
          className="w-full py-2 pl-4 pr-8 leading-tight bg-transparent
            appearance-none focus:outline-none border rounded border-gray-400
          hover:border-gray-500"
          defaultValue={includeAll ? "all" : selectedValue}
          onChange={onChange}
        >
          {displayedOptions.length === 0 && (
            <option className="hidden">(No options)</option>
          )}
          {placeholder && (
            <option value="" className="hidden">
              {placeholder}
            </option>
          )}
          {includeAll && <option value="all">ALL</option>}
          {displayedOptions.map(({ value, label, alpha2 }) => (
            <option key={`${label}-${value}`} value={value}>
              {isNationality && alpha2 ? `${flag(alpha2)}\u00A0` : ""} {label}
              {label !== value && !isSort ? ` - ${value}` : ""}
            </option>
          ))}
        </select>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default Select;
