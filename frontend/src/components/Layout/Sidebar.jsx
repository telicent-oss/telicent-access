import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed h-full left-0 top-[65px] p-2 py-4 text-whiteSmoke shadow-3xl">
      <ul>
        <SidebarItem
          pathname={pathname}
          link="/users"
          label="Users"
          icon="fa-users"
        />
        <SidebarItem
          pathname={pathname}
          link="/groups"
          label="Groups"
          icon="fa-layer-group"
        />
      </ul>
    </nav>
  );
};

const SidebarItem = ({ pathname, link, icon, label }) => (
  <li>
    <Link
      to={link}
      className={`flex flex-col items-center mb-2 p-1 hover:bg-black-300 rounded
        ${pathname === link ? "text-appColor-hex" : ""}`}
    >
      <i className={`fa-solid ${icon} w-4 pt-0.5`} />
      <small className="pt-0.5">{label}</small>
    </Link>
  </li>
);

export default Sidebar;
