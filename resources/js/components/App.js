import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Login from './login/Login';
import Register from './register/Register';
import Home from './Home';
import Clients from './Clients';
import PrivateRoute from './helpers/PrivateRoute';


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
                    <Switch>
                        {/* User might login */}
                        {/* <Route exact path="/" component={Home} /> */}

                        {/* User will login */}
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />

                        {/* Logged in */}
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute path="/clients" component={Clients} />
                        {/* <PrivateRoute path="/clients" component={Clients} /> */}
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));