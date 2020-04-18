import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {
    Container, Row, Col,
    Card, CardBody, CardTitle, CardFooter, Button, CardText
} from 'reactstrap';

class Home extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);

        let AppState;
        let state = localStorage["appState"];
        if (state) {
            AppState = JSON.parse(state);
        }

        this.state = {
            isLoggedIn: AppState.isLoggedIn || false,
            user: AppState.user || {},
        }
    }

    render() {
        return (
            <Container>
                <Row className="mt-4">
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <CardTitle className="text-center">
                                    <h3>Test</h3>
                                </CardTitle>
                                <CardText>Testing</CardText>
                            </CardBody>
                            <CardFooter>
                                <Row>
                                    <Col>
                                        <Link to={`/client`} style={{ textDecoration: 'none' }}>
                                            <Button color="success" block>
                                                Manage
                                                </Button>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <Button color="danger" block>
                                            Delete
                                            </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="mt-2">
                                        <Link to={`/clients`} style={{ textDecoration: 'none' }}>
                                            <Button color="primary" block>
                                                Sessions
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;