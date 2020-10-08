import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import {
    Row, Col,
    Card, Button, CardText, Form, FormGroup, CardHeader, CardBody
} from 'reactstrap';
import Pill from '../utilities/Pill';
import { getDay, getReadableDate, toLocalTime } from '../helpers/functions';
import { FaTimesCircle } from 'react-icons/fa';

class Sessions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adding: false,
        }

        this.addSession = this.addSession.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get(`/api/clients/${id}/sessions`).then((response) => {
            this.setState({
                client: response.data.client,
                sessions: response.data.sessions,
                upcoming_sessions: response.data.upcoming_sessions
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

    addSession(e) {
        this.setState({adding: !this.state.adding});
    }

    render() {
        return (
            <div className="client-container">
                <Row className="mt-4">
                    {!this.state.adding ?
                        <React.Fragment>
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
                                </Col>
                            }
                            <Col>
                                <h3>&nbsp;</h3>
                                <div className="mt-4">
                                    {this.state.client &&
                                        <React.Fragment>
                                            <h5>Upcoming</h5>
                                            {this.state.upcoming_sessions.length ? 
                                                this.state.upcoming_sessions.map((session, key) => (
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
                                            <Pill
                                                target={`/clients/${this.state.client.id}/sessions/new`}
                                                main={[
                                                    this.state.client.session_day,
                                                    moment(this.state.client.next_session.session_date).format('M/D/YYYY'),
                                                    toLocalTime(this.state.client.session_time),
                                                ]}
                                                status={0} />
                                            )}
                                        </React.Fragment>
                                    }
                                    <Button onClick={this.addSession}>Add Session</Button>
                                </div>
                            </Col>
                        </React.Fragment>
                        :
                        <Col>
                            <Card>
                                <CardHeader>
                                    New Session
                                    <FaTimesCircle className="float-right c-pointer" onClick={this.addSession} />
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup row>
                                            <input
                                                id="name"
                                                type="text"
                                                name="name"
                                                placeholder="Client Name (4 Letter Abbreviation)"
                                                className="form-control"
                                                onChange={this.handleInput}
                                                maxLength="4"
                                                required />
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    }
                </Row>
            </div>
        )
    }
}

export default withRouter(Sessions);