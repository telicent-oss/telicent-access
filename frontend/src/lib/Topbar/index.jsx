import React from "react";
import PropTypes from "prop-types";

const Topbar = ({ header, action }) => (
  <section>
    <div className="flex flex-row items-center justify-between p-2">
      <h3 className="text-4xl font-bold truncate">{header}</h3>
      {action}
    </div>
  </section>
);

const { element, string } = PropTypes;

Topbar.defaultProps = {
  action: null,
};

Topbar.propTypes = {
  /**
   * Page name
   */
  header: string.isRequired,
  /**
   * Action component i.e. Create button
   */
  action: element,
};

export default Topbar;
