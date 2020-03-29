import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Login from './login/Login';
import Clients from './Clients';
import PrivateRoute from '../PrivateRoute';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        {/* User might login */}
                        {/* <Route exact path="/" component={Home} /> */}

                        {/* User will login */}
                        <Route path="/login" component={Login} />
                        {/* <Route path="/register" component={Register} /> */}

                        {/* Logged in */}
                        {/* <Route exact path="/clients" component={Clients} /> */}
                        <PrivateRoute path="/clients" component={Clients} />

                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App title="test" />, document.getElementById('app'));

