import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import { Form, FormGroup, Col, Input, FormFeedback, Label, Button } from 'reactstrap';

class LoginContainer extends Component {
    constructor(props) {
        super(props);

        let state = localStorage["appState"];
        let AppState;

        if (state) {
            AppState = JSON.parse(state);
        } else {
            AppState = { user: [] };
        }

        this.state = {
            isLoggedIn: AppState.isLoggedIn || false,
            error: '',
            formSubmitting: false,
            user: Object.keys(AppState.user).length ? AppState.user : {
                email: '',
                password: '',
                remember_me: false,
            },
            remember_me: AppState.remember_me || false,
            redirect: props.redirect,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRememberMe = this.handleRememberMe.bind(this);
    }
    componentDidMount() {
        console.log(this.state);

        const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/' } };
        if (prevLocation && this.state.isLoggedIn) {
            return this.props.history.push(prevLocation);
        }
    }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ formSubmitting: true });
        let userData = this.state.user;
        console.log(userData);
        axios.post("/api/login", userData).then((response) => response).then((json) => {
            console.log(json);
            if (json.status === 200) {
                console.log(json.data, json.data.token);

                axios.defaults.headers.common['Authorization'] = `Bearer ${json.data.token}`;

                let userData = {
                    id: json.data.id,
                    email: json.data.email,
                    access_token: json.data.token,
                }

                let appState = {
                    isLoggedIn: true,
                    user: userData,
                    remember_me: this.state.remember_me,
                }

                localStorage['appState'] = JSON.stringify(appState);

                // <Redirect to="/clients" />

                this.setState({ loggedIn: true });

                props.history.push('/')

            } else {
                alert(`Our System Failed To Register Your Account!`);
            }
        }).catch((error) => {
            if (error.response) {
                this.setState({
                    error: error.response.data.response,
                    errorMessage: error.response.data.response,
                    formSubmitting: false
                })
            }
        }).finally(this.setState({ error: '' }));
    }
    handleEmail(e) {
        let value = e.target.value;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                email: value,
            }
        }));
    }
    handlePassword(e) {
        let value = e.target.value;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                password: value,
            }
        }));

    }

    handleRememberMe(e) {
        let value = e.target.checked;

        this.setState({ remember_me: value });
    }

    render() {
        const { error } = this.state;

        if (this.state.loggedIn) {
            // this.props.history.push('/')
            console.log('logged in!');
            // window.location.href = "/";
            return <Redirect to="/" />
        }

        return (
            <div>
                <h2 className="text-center mb-4">Log In To Your Account</h2>
                {this.state.isLoggedIn ? <FlashMessage duration={60000} persistOnHover={true}>
                    <h5 className={"alert alert-success"}>Login successful, redirecting...</h5></FlashMessage> : ''}
                {error && !this.state.isLoggedIn ? <FlashMessage duration={100000} persistOnHover={true}>
                    <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <input id="email" type="email" name="email" placeholder="E-mail" className="form-control" required defaultValue={this.state.user.email} onChange={this.handleEmail} />
                    </FormGroup>
                    <FormGroup row>
                        <input id="password" type="password" name="password" placeholder="Password" className="form-control" required onChange={this.handlePassword} />
                    </FormGroup>
                    <FormGroup row>
                        <Col md={6}>
                            <input id="remember" type="checkbox" name="remember" checked={this.state.remember_me} onChange={this.handleRememberMe}></input>
                            <FormFeedback></FormFeedback>
                            <Label for="remember" className="ml-1">Remember Me</Label>
                        </Col>
                        <Col md={6} className="text-right">
                            <Link to="/forgot">
                                Forgot Password?
                            </Link>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col md={{ size: 6, offset: 3 }}>
                            <Button type="submit" color="primary" size="lg" block>
                                {this.state.formSubmitting ? "Logging You In..." : "Log In"}
                            </Button>
                        </Col>
                    </FormGroup>

                </Form>
            </div>
        )
    }
}
export default withRouter(LoginContainer);
