import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Login from './login/Login';
import Register from './register/Register';
import Home from './Home';
import Clients from './clients/Clients';
import PrivateRoute from './helpers/PrivateRoute';
import EditClient from './clients/EditClients';
import Goals from './goals/Goals';
import AddGoal from './goals/AddGoal';
import Sessions from './sessions/Sessions';
import AddSession from './sessions/AddSession';
import EditSession from './sessions/EditSession';
import Sidebar from './sidebar/Sidebar';


class App extends Component {
    constructor() {
        super()

        let AppState;
        let state = localStorage["appState"];
        if (state) {
          AppState = JSON.parse(state);
        }
    
        this.state = {
            isLoggedIn: AppState.isLoggedIn || false,
            user: AppState.user || {},
            clients: [],
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} />
                    <Sidebar />
                    <Switch>
                        {/* User might login */}
                        {/* <Route exact path="/" component={Home} /> */}

                        {/* User will login */}
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />

                        {/* Logged in */}
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute exact path="/clients" component={Clients} />

                        {/* Goal Paths */}
                        <PrivateRoute path="/clients/:id/goals/new" component={AddGoal} />
                        <PrivateRoute path="/clients/:id/goals" component={Goals} />

                        {/* Session Paths */}
                        <PrivateRoute path="/clients/:id/sessions/new" component={AddSession} />
                        <PrivateRoute path="/clients/:id/sessions/:session_id" component={EditSession} />
                        <PrivateRoute path="/clients/:id/sessions" component={Sessions} />

                        <PrivateRoute path="/clients/:id" component={EditClient} />
                        <PrivateRoute path="/sessions/:id/edit" component={EditSession} />

                        {/* <PrivateRoute path="/clients" component={Clients} /> */}
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));