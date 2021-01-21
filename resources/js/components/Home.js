import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
    Container, Row, Col,
    Card, CardBody, CardTitle, CardFooter, Button, CardText
} from 'reactstrap';
import { toLocalTime, days } from './helpers/functions';
import Calendar from './utilities/Calendar';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clients: [],
            monthSessions: [],
            month: null,
        }

        this.dateSearch = this.dateSearch.bind(this);
    }

    componentDidMount() {
        axios.post('/api/clients/upcoming').then((response) => {
            this.setState({
                clients: response.data.clients,
                monthSessions: response.data.upcomingSessions,
                month: moment(),
            });
        });
    }

    dateSearch(month) {
        let m = moment(month).month() + 1;
        console.log(m);
        axios.post(`/api/sessions/month/${m}`).then((response) => {
            console.log(response);
            this.setState({
                monthSessions: response.data.sessions,
                month: moment(month),
            })
        });
    }

    render() {

        return (
            <React.Fragment>
                <Row className="mt-4">
                    <Col md="4">
                        {this.state.clients.length ? this.state.clients.map((client, index) => (
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
                        ) : (
                            <Card className="text-center mb-2">
                                <CardBody>
                                        <CardTitle>
                                            <h3>No Clients!</h3>
                                            <Link to={`/clients`}>Add one!</Link>
                                        </CardTitle>
                                </CardBody>
                            </Card>
                        )}
                    </Col>
                    <Col>
                        <Calendar data={this.state.monthSessions} date={this.state.month} monthChange={this.dateSearch} />
                        {/* TODO: Add invoicing details here */}
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default Home;