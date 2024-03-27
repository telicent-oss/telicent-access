import React from "react";

const Textarea = ({
  id,
  label,
  placeholder,
  hint,
  value,
  onChange,
  required,
  readOnly,
}) => (
  <div className="flex flex-col mb-4">
    <label htmlFor={id} className="pb-2 text-xs font-thin uppercase">
      {label} {required && <span className="text-red">*</span>}
    </label>
    <textarea
      id={id}
      className={`p-2 bg-transparent border rounded
        ${readOnly ? "border-black-200" : "border-black-900"}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
    {hint && <p className="text-sm">{hint}</p>}
  </div>
);

export default Textarea;
