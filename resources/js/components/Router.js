import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Login from './login/Login';
import Register from './register/Register';
import Clients from './Clients';
import PrivateRoute from '../PrivateRoute';

export default class Router extends Component {
    constructor(props) {
        super(props);

        let state = localStorage["appState"];
        let AppState = false;
        if (state) {
            AppState = JSON.parse(state);
        }

        this.state = {
            isLoggedIn: AppState.isLoggedIn,
            user: Object.keys(AppState.user).length ? AppState.user : {},
        }
    }

    render() {
        return (
            <div>
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} />
                <Switch>
                    {/* User might login */}
                    {/* <Route exact path="/" component={Home} /> */}

                    {/* User will login */}
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />

                    {/* Logged in */}
                    {/* <Route exact path="/clients" component={Clients} /> */}
                    <PrivateRoute path="/clients" component={Clients} />
                </Switch>
            </div>
        );
    }

}