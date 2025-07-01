import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TeliBasicLayout } from "@telicent-oss/ds";

import Users from "./pages/Users";
import Groups from "./pages/Groups";
import Update from "./components/Users/Update/Update";
import CreateGroup from "./components/Groups/Create/Create";
import Group from "./components/Groups/Group/Group";
import Sidebar from "./components/Layout/Sidebar";

import Header from "./components/Layout/Header";
import Backups from "./pages/Backups";
import config from "./config/app-config";

const App = () => (
  <>
    <Header />
    <div className="flex w-full mt-2">
      <div className="w-20">
        <Sidebar />
      </div>
      <TeliBasicLayout>
        <div className="w-full">
          <Routes>
            <Route path="/users" exact element={<Users />} />
            <Route path="/groups" exact element={<Groups />} />
            {config.featureFlags.FF_BACKUPS_DEMO &&
              <Route path="/backups" exact element={<Backups />} />
            }
            <Route path="/groups/create" element={<CreateGroup />} />
            <Route path="/groups/:id" element={<Group />} />
            <Route path="/users/:id/update" element={<Update />} />
            <Route
              path="/health"
              element={<h3>Hello from Telicent ACCESS</h3>}
            />
            <Route path="*" element={<Navigate to="/users" />} />
          </Routes>
        </div>
      </TeliBasicLayout>
    </div>
  </>
);

export default App;
