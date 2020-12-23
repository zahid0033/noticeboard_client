import React from 'react';
import {Route,Redirect} from "react-router-dom";
import {connect} from "react-redux";

const AdminRoute = ({ component: Component,auth, ...rest }) => (
    <Route
        {...rest}
        render={ props =>
            auth.isAuthenticated === true && auth.type === 'admin' ? (
                <Component {...props}/>
            ): (
                <Redirect to="/login" />
            )
        }
    />
)

const mapStateToProps = state =>({
    auth : state.auth
})

export default connect(mapStateToProps)(AdminRoute)