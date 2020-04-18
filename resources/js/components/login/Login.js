import React, { Component } from 'react';

import { 
    Container, Row, Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardHeader, CardFooter,
    Form, FormGroup, FormFeedback, Label, Input
} from 'reactstrap';
import { Link, Route, withRouter } from 'react-router-dom';
import LoginContainer from './LoginContainer';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: props.location,
        };
    }

    render() {
        return (
            <div className="content">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Card className="mt-4">
                                <CardHeader>Login</CardHeader>
                                <CardBody>
                                    <LoginContainer redirect={this.state.redirect} />
                                </CardBody>
                                <CardFooter>
                                    <div className="text-dark text-center">
                                        Don't have an account? 
                                        <Link to="/register" className="text-yellow">
                                            &nbsp;Register Now
                                        </Link>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
            {/* <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card>
                            <CardHeader>Login</CardHeader>

                            <CardBody>
                                <Form action="/login">

                                    <FormGroup row>
                                        <Label for="email" md={4}>E-Mail Address</Label>
                                        <Col md={6}>
                                            <Input id="email" type="email" name="email" autoComplete="email" autoFocus></Input>
                                            <FormFeedback></FormFeedback>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="password" md={4}>Password</Label>
                                        <Col md={6}>
                                            <Input id="password" type="password" name="password" autoComplete="current-password" autoFocus></Input>
                                            <FormFeedback></FormFeedback>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md={{ size: 6, offset: 4}} >
                                            <Input id="remember" type="checkbox" name="remember"></Input>
                                            <FormFeedback></FormFeedback>
                                            <Label for="remember">Remember Me</Label>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md={{ size: 6, offset: 4}}>
                                            <Button type="submit" color="primary">Login</Button>
                                        </Col>
                                    </FormGroup>

                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container> */}
    }
}

export default withRouter(Login);