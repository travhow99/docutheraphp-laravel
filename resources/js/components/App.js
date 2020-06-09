import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Header from './Header';
import Login from './login/Login';
import Register from './register/Register';
import Home from './Home';
import Clients from './clients/Clients';
import PrivateRoute from './helpers/PrivateRoute';
import EditClient from './clients/EditClient';
import ManageClient from './clients/ManageClient';
import Goals from './goals/Goals';
import AddGoal from './goals/AddGoal';
import Sessions from './sessions/Sessions';
import AddSession from './sessions/AddSession';
import EditSession from './sessions/EditSession';
import Sidebar from './sidebar/Sidebar';
import { Row, Col, Container } from 'reactstrap';

// optional configuration
const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
}  

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
            remember_me: AppState.remember_me || false,
            clients: [],
        }

        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        console.log('top state',this.state);
    }

    logOut() {
        let appState = {
            isLoggedIn: false,
            user: {},
            remember_me: this.state.remember_me || false,
        };

        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
        this.props.history.push('/login');
    }


    render() {
        return (
            <BrowserRouter>
                <AlertProvider template={AlertTemplate} {...options}>
                    <div>
                        <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} logOut={this.logOut} />
                        <div className="d-flex mx-0">
                            {this.state.isLoggedIn && <Sidebar />}
                            <div className="flex-grow-1">
                                <Container fluid={true} className="h-100 dash-body">
                                    <Switch>
                                        {/* User might login */}
                                        {/* <Route exact path="/" component={Home} /> */}

                                        {/* User will login */}
                                        <Route path="/login" component={Login} />
                                        <Route path="/register" component={Register} />

                                        {/* Logged in */}
                                        <PrivateRoute exact path="/" component={Home} />
                                        <PrivateRoute exact path="/clients" component={Clients} />
                                        <PrivateRoute path="/clients/:id" component={ManageClient} />

                                    </Switch>
                                </Container>
                            </div>
                        </div>
                    </div>
                </AlertProvider>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));