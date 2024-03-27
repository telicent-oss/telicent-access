import React from "react";
import { TeliButton } from "@telicent-oss/ds";

const LoadingButton = ({ loading, onClick, label, disabled }) => (
  <TeliButton
    id={`${label}-button`}
    variant="secondary"
    className={
      "w-36 min-w-max ml-8 border " +
      `${
        loading ? "align-top py-2" : "hover:bg-ravenBlack hover:text-whiteSmoke"
      }`
    }
    disabled={disabled}
    onClick={onClick}
  >
    {loading ? (
      <span className="ri-loader-5-line animate-spin inline-block align-middle" />
    ) : (
      <span>{label}</span>
    )}
  </TeliButton>
);

export default LoadingButton;
