import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {
    Container, Row, Col,
    Card, CardBody, CardTitle, CardFooter, Button, CardText
} from 'reactstrap';
import { toLocalTime } from './helpers/functions';
import Calendar from './utilities/Calendar';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clients: [],
            upcomingSessions: [],
        }
    }

    componentDidMount() {
        axios.post('/api/clients/upcoming').then((response) => {
            this.setState({
                clients: response.data,
            });
        });

    }

    render() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return (
            <React.Fragment>
                <Row className="mt-4">
                    <Col md="4">
                        {this.state.clients && this.state.clients.map((client, index) => (
                            (client.next_session !== 'Session not available') &&
                                <Card key={index} className="text-center mb-2">
                                    <CardBody>
                                        <CardTitle>
                                            <h3>{client.name}</h3>
                                        </CardTitle>
                                        <CardText>
                                            {days[new Date(client.next_session).getDay()] || days[new Date(client.next_session.session_date).getDay()]}
                                            <br />
                                            {toLocalTime(client.session_time)}
                                        </CardText>
                                        <Link to={`/clients/${client.id}`}>Manage Client</Link>
                                    </CardBody>
                                </Card>
                            )
                        )}
                    </Col>
                    <Col>
                            <Calendar />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default Home;