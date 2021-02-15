import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./components/Layouts/NavBar";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRoute from "./ProtectedRoutes/AdminRoute";
import Material from "./pages/Material";
import Noticeboard from "./pages/Noticeboard";
import EditNoticeBoard from "./pages/EditNoticeBoard";
import EditNoticeSet from "./pages/EditNoticeSet";
import Setting from "./pages/Setting";

function RouteBody() {
  return (
    <div className="mainBody">
      <NavBar />
      <AdminRoute exact path="/" component={DashBoard} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <AdminRoute path="/materials" component={Material} />
      <AdminRoute path="/notices" component={Noticeboard} />
      <AdminRoute path="/editnoticeset/:id" component={EditNoticeSet} />
      <AdminRoute path="/noticeboard/:id" component={EditNoticeBoard} />
      <AdminRoute path="/settings" component={Setting} />
    </div>
  );
}

export default RouteBody;
