import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

export default function AdminRoute({ component: Component, ...rest }) {
    const { isAuthenticated, user } = useSelector(state => state.auth)
    return (
        <Route {...rest} render={props =>
            isAuthenticated && user.type === 'admin' ? (
                <Component {...props} />
            ) : (
                    <Redirect to='/login' />
                )
        } />
    )
}
