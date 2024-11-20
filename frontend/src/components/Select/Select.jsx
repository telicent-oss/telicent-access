import React from "react";
import flag from "country-code-emoji";
import { TeliSelect } from "@telicent-oss/ds";

const transformOptions = (data, options) => {
  let mapped = [];

  if (options.includeAll) {
    mapped.push({
      id: "all",
      label: "ALL",
      value: "all",
    });
  }

  if (data.length === 0) {
    mapped.push({
      id: "hidden",
      label: "(No options)",
      value: "no-options",
    });
  }

  const displayed = data.map(({ value, label, alpha2 }) => ({
    id: `${label}-${value}`,
    value,
    label: `${
      options.isNationality && alpha2 ? `${flag(alpha2)}\u00A0` : ""
    } ${label} ${label !== value && !options.isSort ? ` - ${value}` : ""}`,
  }));

  mapped = mapped.concat(displayed);

  return mapped;
};

const Select = ({
  id,
  options,
  onChange,
  includeAll,
  selectedValue,
  isNationality,
  isSort,
}) => {
  const generatedOptions = transformOptions(options, {
    includeAll,
    isNationality,
    isSort,
  });

  const noOption = generatedOptions.length === 1 && generatedOptions.every((op) => op.value === "no-options");

  return (
    <div className="relative inline-block w-auto">
      <TeliSelect
        fullWidth
        value={noOption ? "no-options" : selectedValue}
        options={generatedOptions}
        selectId={id}
        onChange={onChange}
        readOnly={noOption}
      />
    </div>
  );
};

export default Select;
