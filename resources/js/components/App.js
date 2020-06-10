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
import ManageClient from './clients/ManageClient';
import Sidebar from './sidebar/Sidebar';
import { Container } from 'reactstrap';

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

        this.updateStorage = this.updateStorage.bind(this);
    }

    componentDidMount() {
        console.log('top state',this.state);
    }

    updateStorage(storage) {
        if (storage.remember_me) {
            storage.user.email = this.state.user.email;
        }

        console.log(storage);
        this.setState(storage);
    }

    render() {
        console.log('render', this.state);
        return (
            <BrowserRouter>
                <AlertProvider template={AlertTemplate} {...options}>
                    <div>
                        <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} remember_me={this.state.remember_me} update={this.updateStorage} />
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