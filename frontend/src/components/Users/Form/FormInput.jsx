import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { validateEmail } from "../../../utils/utils";

const FormInput = forwardRef(
  ({ id, label, placeholder, value, onChange, isValidationActive }, ref) => {
    const inputRef = useRef();
    const isAttemptInvalid =
      isValidationActive &&
      (!value || (id === "email" && !validateEmail(value)));
    const [val, setVal] = useState(value ?? "");
    useImperativeHandle(ref, () => ({
      setFocus(isFocus) {
        if (isFocus) {
          inputRef.current?.focus();
        }
      },
    }));
    const onChangeInput = (e) => {
      setVal(e.target.value);
      onChange(e);
    };

    return (
      <div className="flex flex-col mb-4">
        <label htmlFor={id} className="pb-2 text-xs font-thin uppercase">
          {label} *
        </label>
        <input
          id={id}
          ref={inputRef}
          type="text"
          className={`input col-span-4 h-10 p-2 rounded bg-transparent text-base
            border border-black-900 ${
              isAttemptInvalid ? "border border-red-400 outline-red-400" : ""
            }`}
          placeholder={placeholder}
          value={val}
          onChange={onChangeInput}
        />
        <p className="mt-1 text-red-400">
          {isAttemptInvalid ? `Please enter a valid ${label}.` : ""}
        </p>
      </div>
    );
  }
);

export default FormInput;
