import React, { Component } from 'react';

import { 
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import RegisterContainer from './RegisterContainer';

class Register extends Component {
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
                                    <RegisterContainer redirect={this.state.redirect} />
                                </CardBody>
                                <CardFooter>
                                    <div className="text-dark text-center">
                                        Already have an account?
                                        <Link to="/login">
                                            &nbsp;Log In
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

export default Register;