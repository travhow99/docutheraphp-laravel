import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import axios from 'axios';

let state_of_state = localStorage["appState"];

if (!state_of_state) {
    let appState = {
        isLoggedIn: false,
        user: {},
    };
    localStorage["appState"] = JSON.stringify(appState);
}

let state = localStorage["appState"];
let AppState = JSON.parse(state);
console.log('state', AppState);

const Auth = {
    isLoggedIn: AppState.isLoggedIn,
    user: AppState,
}

const token = AppState.user.access_token;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

console.log('auth',Auth);

const PrivateRoute = ({ component: Component, path, ...rest }) => (
    <div>
        <Route path={path}
            {...rest}
            render={(props) => Auth.isLoggedIn ? (
                <Component {...props} />
                ) : (
                <Redirect to={{
                    pathname: "/login",
                    state: {
                        prevLocation: path,
                        error: "You must login first.",
                    },
                }}
                />
                )
            }
        />
    </div>);

export default withRouter(PrivateRoute);