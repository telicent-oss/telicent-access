import React from "react";
import PropTypes from "prop-types";
import { TeliSpinner } from "@telicent-oss/ds";

const Panel = ({ ariaLabel, loading, additionalClassName, children }) => (
  <li
    aria-label={ariaLabel}
    className={`flex h-fit w-full mb-3 py-4 px-6 bg-black-200 rounded-lg ${additionalClassName}`}
  >
    {loading && <TeliSpinner />}
    {!loading && children}
  </li>
);

const { bool, string, node } = PropTypes;

Panel.defaultProps = {
  ariaLabel: "",
  loading: false,
};

Panel.propTypes = {
  ariaLabel: string,
  loading: bool,
  children: node.isRequired,
};

export default Panel;
