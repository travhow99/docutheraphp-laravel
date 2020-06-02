import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import {
    Container, Row, Col,
    Card, CardBody, CardTitle, CardFooter, Button, CardText, Form
} from 'reactstrap';
import Pill from '../utilities/Pill';
import { getDay, getReadableDate, toLocalTime } from '../helpers/functions';

class Sessions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get(`/api/clients/${id}/sessions`).then((response) => {
            this.setState({
                client: response.data.client,
                sessions: response.data.sessions,
            });

            console.log(this.state);
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ formSubmitting: true });
        let clientData = this.state.client;
        console.log(clientData);

        // TODO: 
        axios.put(`/api/clients/${this.state.client.id}/sessions`, clientData).then((response) => {
            console.log(response);
            return response;
        }).then((json) => {
            if (json.status === 200) {
                console.log(json.data);

                this.props.return();
            }
        })

    }

    render() {
        return(
            <Container>
                <Row className="mt-4">
                    {this.state.client && 
                        <Col>
                            <h3>Sessions With {this.state.client.name}</h3>
                            <div className="mt-4">
                                <h5>Past</h5>
                                {this.state.sessions.length >= 1 ? 
                                    this.state.sessions.map((session, key) => (
                                        <Pill
                                            key={key}
                                            target={`/clients/${this.state.client.id}/sessions/${session.id}`} 
                                            main={[
                                                getDay(moment(session.session_date).get('day')),
                                                moment(session.session_date).format('M/D/YYYY'),
                                                toLocalTime(session.session_time),
                                            ]}
                                            status={session.complete}
                                        /> 
                                    )) : (
                                        <p>Not currently available</p>
                                    )}
                            </div>
                            {typeof(this.state.client.next_session) === 'string' &&
                                <div className="mt-4">
                                    <h5>Upcoming</h5>
                                    <Pill
                                        target={`/clients/${this.state.client.id}/sessions/new`} 
                                        main={[
                                            this.state.client.session_day,
                                            getReadableDate(this.state.client.next_session),
                                            toLocalTime(this.state.client.session_time),
                                        ]} 
                                        status={0} />
                                </div>
                            }
                        </Col>
                    }
                    <Col>
                        <h3>&nbsp;</h3>
                        <div className="mt-4">
                            <h5>Add Session</h5>
                            + {/* Add expander */}
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(Sessions);