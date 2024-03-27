import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TeliStandardLayout } from "@telicent-oss/ds";

import Users from "./pages/Users";
import Groups from "./pages/Groups";
import Create from "./components/Users/Create/Create";
import Update from "./components/Users/Update/Update";
import CreateGroup from "./components/Groups/Create/Create";
import Group from "./components/Groups/Group/Group";
import Sidebar from "./components/Layout/Sidebar";

const App = () => (
  <TeliStandardLayout appName="access" className="overflow-y-auto">
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
          <Route path="/users/create" element={<Create />} />
          <Route path="/users/:id/update" element={<Update />} />
          <Route path="/health" element={<h3>Hello from Telicent ACCESS</h3>} />
          <Route path="*" element={<Navigate to="/users" />} />
        </Routes>
      </div>
    </div>
  </TeliStandardLayout>
);

export default App;
