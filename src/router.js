import React from 'react'
import { Route } from "react-router-dom";
import NavBar from './components/Layouts/NavBar';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRoute from './ProtectedRoutes/AdminRoute';
import Material from './pages/Material'
import Noticeboard from './pages/Noticeboard'
import Program from "./component/pages/program";
import ProgramEdit from "./component/pages/programEdit";

function RouteBody() {
    return (
        <div className="mainBody">
            <NavBar />
            <AdminRoute exact path="/" component={DashBoard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <AdminRoute path="/materials" component={Material} />
            <AdminRoute path="/noticeboard" component={Noticeboard} />
            <Route exact path="/program" component={Program} />
            <Route exact path="/program/edit/:programId" component={ProgramEdit} />
        </div>
    )
}

export default RouteBody;