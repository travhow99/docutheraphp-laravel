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
    }
}

export default withRouter(Login);