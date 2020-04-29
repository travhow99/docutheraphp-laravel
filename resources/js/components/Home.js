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

        this.state = {
            clients: [],
            upcomingSessions: [],
        }
    }

    componentDidMount() {
        axios.post('/api/clients/upcoming').then((response) => {
            console.log(response);
            this.setState({
                clients: response.data,
            });
            console.log('state:',this.state);
        });

    }

    render() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return (
            <Container>
                <Row className="mt-4">
                    <Col md="4">
                        {this.state.clients.map((client, index) => (
                            (client.next_session !== 'Session not available') &&
                                <Card key={index} className="text-center">
                                    <CardBody>
                                        <CardTitle>
                                            <h3>{client.name}</h3>
                                        </CardTitle>
                                        <CardText>
                                            {days[new Date(client.next_session).getDay()]}
                                            <br />
                                            {client.session_time}
                                        </CardText>
                                        <Link to="/clients">Manage Client</Link>
                                    </CardBody>
                                </Card>
                        ))}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;