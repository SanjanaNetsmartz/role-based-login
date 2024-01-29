import React from "react";
import { Route, Routes } from "react-router-dom";
import { WithoutAuth } from "./WithoutAuth";

import LoginPage from "../../src/pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import routes from "../router/routes";
import UserFormPage from "../pages/UserFormPage";
import { RequireAuth } from "./RequireAuth";
import { RoleBasedLoginCurrentUser } from "../utils/validations";
import { get } from "../utils/lodash";
// import ErrorPage from "pages/ErrorPage";

const MainRoute = () => {
  // Initial page, we can change this based on user role in future
   const { user } = RoleBasedLoginCurrentUser();
  const userRole=get(user,"role","");
  const defaultPath = routes.app.login;

  return (
    <Routes>
      <Route
        path={defaultPath}
        element={
          <WithoutAuth path={defaultPath}>
            <LoginPage />
          </WithoutAuth>
        }
      />
      {userRole === "admin" && (
        <Route exact path={routes.app.dashboard}
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>} />
      )}

      {userRole === "user" && (
        <Route exact path={routes.app.userForm}
          element={
            <RequireAuth>
              <UserFormPage />
            </RequireAuth>} />
      )}
    
    </Routes>
  );
}

  export default MainRoute