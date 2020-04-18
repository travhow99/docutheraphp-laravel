import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import FlashMessage from 'react-flash-message';
import { Form, FormGroup, Button } from 'reactstrap';

class RegisterContainer extends Component {
    constructor(props) {
        super(props);

        let state = localStorage["appState"];
        let AppState;

        if (state) {
            AppState = JSON.parse(state);
        } else {
            AppState = {user: []};
        }

        this.state = {
            isRegistered: AppState.isLoggedIn || false,
            error: '',
            errorMessage: '',
            formSubmitting: false,
            user: Object.keys(AppState.user).length ? AppState.user : {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            redirect: props.redirect,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.isRegistered) {
            return this.props.history.push("/dashboard");
        }

        const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/dashboard' } };
        if (prevLocation && this.state.isLoggedIn) {
            return this.props.history.push(prevLocation);
        }
    }

    handleChange(e) {
        e.preventDefault();
        let value = e.target.value;
        let name = e.target.name;

        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [name]: value,
            }
        }));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ formSubmitting: true });
        ReactDOM.findDOMNode(this).scrollIntoView();
        let userData = this.state.user;
        axios.post("/api/register", userData)
            .then((response) => {
                console.log(response);
                return response;
            }).then((json) => {
                console.log(json);
                if (json.status === 201) {
                    let userData = {
                        id: json.data.id,
                        name: json.data.name,
                        email: json.data.email,
                        activation_token: json.data.activation_token,
                    };
                    let appState = {
                        isRegistered: true,
                        user: userData
                    };
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isRegistered: appState.isRegistered,
                        user: appState.user
                    });
                } else {
                    alert(`Our System Failed To Register Your Account!`);
                }
            }).catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code that falls out of the range of 2xx
                    let err = error.response.data;
                    this.setState({
                        error: err.message,
                        errorMessage: err.errors,
                        formSubmitting: false
                    })
                }
                else if (error.request) {
                    // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                    let err = error.request;
                    this.setState({
                        error: err,
                        formSubmitting: false
                    })
                } else {
                    // Something happened in setting up the request that triggered an Error
                    let err = error.message;
                    this.setState({
                        error: err,
                        formSubmitting: false
                    })
                }
            }).finally(this.setState({ error: '' }));
    }

    render() {
        let errorMessage = this.state.errorMessage;
        let arr = [];
        Object.values(errorMessage).forEach((value) => (
            arr.push(value)
        ));
        return (
            <div>
                <h2>Create Your Account</h2>
                {this.state.isRegistered ? <FlashMessage duration={60000} persistOnHover={true}>
                    <h5 className={"alert alert-success"}>Registration successful, redirecting...</h5></FlashMessage> : ''}
                {this.state.error ? <FlashMessage duration={900000} persistOnHover={true}>
                    <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5>
                    <ul>
                        {arr.map((item, i) => (
                            <li key={i}><h5 style={{ color: 'red' }}>{item}</h5></li>
                        ))}
                    </ul></FlashMessage> : ''}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <input id="name" type="text" name="name" placeholder="Name" className="form-control" required onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <input id="email" type="email" name="email" placeholder="E-mail" className="form-control" required onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <input id="password" type="password" name="password" placeholder="Password" className="form-control" required onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <input id="password_confirm" type="password" name="password_confirmation" placeholder="Confirm Password" className="form-control" required onChange={this.handleChange} />
                    </FormGroup>
                    <Button type="submit" color="primary" size="lg" block disabled={this.state.formSubmitting ? true : false}>Create Account</Button>
                </Form>
            </div>
        )
    }
}
export default withRouter(RegisterContainer);