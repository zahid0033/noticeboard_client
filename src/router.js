import React,{Component} from 'react'
import {Route} from "react-router-dom";
import Dashboard from "./component/dashboard";
import Login from "./component/login/login";
import Home from "./component/agent/home";
import AgentRoute from "./component/ProtectedRoute/agentRoute";
import AdminRoute from "./component/ProtectedRoute/adminRoute";
import Topbar from "./component/template/topbar";
import GraniteList from "./component/graniteList/graniteList";
import LoginRoute from "./component/ProtectedRoute/loginRoute";
import Admin from "./component/admin/admin";
import Material from "./component/pages/material";

class Router extends Component {
    render() {
        return(
            <div>
                <Topbar/>
                <div className="mainBody">
                    <Route exact path="/" component={Dashboard}/>
                    <LoginRoute exact path="/login" component={Login}/>
                    <Route exact path="/granite/list" component={GraniteList}/>
                    <Route exact path="/material" component={Material}/>
                    <AgentRoute exact path="/agent" component={Home}/>
                    <AdminRoute exact path="/admin" component={Admin}/>
                </div>
            </div>
        )
    }
}
export default Router