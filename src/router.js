import React from 'react'
import { Route } from "react-router-dom";
import NavBar from './components/Layouts/NavBar';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRoute from './ProtectedRoutes/AdminRoute';
import Material from './pages/Material'
import Noticeboard from './pages/Noticeboard'

function RouteBody() {
    return (
        <div className="mainBody">
            <NavBar />
            <AdminRoute exact path="/" component={DashBoard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <AdminRoute path="/materials" component={Material} />
            <AdminRoute path="/noticeboard" component={Noticeboard} />
        </div>
    )
}
export default RouteBody