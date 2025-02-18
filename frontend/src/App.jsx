import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TeliBasicLayout, TeliBrand, TeliHeader } from "@telicent-oss/ds";

import Users from "./pages/Users";
import Groups from "./pages/Groups";
import Update from "./components/Users/Update/Update";
import CreateGroup from "./components/Groups/Create/Create";
import Group from "./components/Groups/Group/Group";
import Sidebar from "./components/Layout/Sidebar";
import packageJson from "../package.json";

const App = () => (
  <TeliBasicLayout>
    <TeliHeader className="flex items-center justify-center mb-2 shadow-3xl bg-black-100 h-[64px]">
      <TeliBrand appName="access" className="p-1" />
      {packageJson.version}
    </TeliHeader>
    <div className="flex w-full">
      <div className="w-20">
        <Sidebar />
      </div>

      <div className="w-full">
        <Routes>
          <Route path="/users" exact element={<Users />} />
          <Route path="/groups" exact element={<Groups />} />
          <Route path="/groups/create" element={<CreateGroup />} />
          <Route path="/groups/:id" element={<Group />} />
          <Route path="/users/:id/update" element={<Update />} />
          <Route path="/health" element={<h3>Hello from Telicent ACCESS</h3>} />
          <Route path="*" element={<Navigate to="/users" />} />
        </Routes>
      </div>
    </div>
  </TeliBasicLayout>
);

export default App;
