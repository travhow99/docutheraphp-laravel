import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter, Link, Redirect } from 'react-router-dom';
import {
    Container, Row, Col,
    Card, CardBody, CardTitle, CardFooter, Button, CardText, Form, Input, Label
} from 'reactstrap';
import SessionGoal from './SessionGoal';
import DatePicker from "react-datepicker";
import { GoGear } from 'react-icons/go';
import { toLocalTime } from '../helpers/functions';

import "react-datepicker/dist/react-datepicker.css";

class EditSession extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: null,
            goals: [],
            editingDate: false,
            deleted: false,
        }

        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.toggleEditDate = this.toggleEditDate.bind(this);
        this.deleteSession = this.deleteSession.bind(this);
    }

    /**
     * @todo if 'new', don't post
     */
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        const session_id = this.props.match.params.session_id;
        console.log(session_id);

        axios.get(`/api/clients/${id}/sessions/${session_id}`).then((response) => {
            this.setState({
                client: response.data.client,
                session: response.data.session,
                goals: response.data.goals,
            });

            console.log(this.state);
        })
    }

    toggleEditDate() {
        this.setState({editingDate: !this.state.editingDate});
    }

    deleteSession(e) {
        e.preventDefault();

        axios.delete(`/api/clients/${this.state.client.id}/sessions/${this.state.session.id}`)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        session: response.data,
                        deleted: true,
                    });
                }
            })
    }

    handleTimeChange(e) {
        // const date = new Date(e);
        const date = moment(e);

        const session_date = date.format('YYYY-MM-D');
        const session_time = date.format('HH:mm:SS');

        console.log(date, session_time);

        axios.put(`/api/clients/${this.state.client.id}/sessions/${this.state.session.id}`, {
            session_date,
            session_time,
        }).
        then((response) => response)
        .then((json) => {
            if (json.status === 200) {
                console.log(json.data);

                this.setState({
                    session: {
                        ...this.state.session,
                        session_date: session_date,
                        session_time: session_time,
                    },
                    editingDate: false,
                });
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ formSubmitting: true });
        /* let clientData = this.state.client;
        console.log(clientData);

        axios.post(`/api/clients/${this.state.client.id}/sessions`, clientData).then((response) => {
            console.log(response);
            return response;
        }).then((json) => {
            if (json.status === 200) {
                console.log(json.data);

                this.props.return();
            }
        }) */
    }

    render() {
        console.log('STATE:',this.state);
        const time = this.state.session ? this.state.session.session_date + " " + this.state.session.session_time : null;
        
        const datepicker = moment(time).toDate();
        console.log('datepicker:',datepicker);

        if (this.state.deleted) {
            return <Redirect to={`/clients/${this.state.client.id}/sessions`} />
        }
        
        return(
            <Container>
                <Row className="mt-4">
                    {this.state.session && 
                        <Col xs="6">
                            <h2>{this.state.client.name}</h2>
                            <div className="d-flex justify-content-around mb-4">
                                {!this.state.editingDate ? 
                                (
                                    <div>
                                        <h4>{moment(this.state.session.session_date).format('M/D/yyyy')}</h4>
                                        <h5>{toLocalTime(this.state.session.session_time)}</h5>
                                    </div>
                                ) : (
                                    <DatePicker
                                        selected={datepicker}
                                        onChange={this.handleTimeChange}
                                        showTimeSelect
                                        dateFormat="Pp"
                                    />
                                )
                                }

                                {/* <div className="flex-0"> */}
                                {/* <Button color="success">Edit</Button> */}
                                <GoGear 
                                    className="flex-0 ml-2" 
                                    onClick={this.toggleEditDate} />
                            </div>
                        </Col>
                    }
                </Row>
                <Row>
                    {this.state.client &&
                    <Col>
                        {this.state.goals.length > 0 ? (
                            this.state.goals.map((goal, index) => (
                                <Card key={index} className="p-4 mb-3">
                                    <SessionGoal key={index} goal={goal} client_id={this.state.client.id} />
                                </Card>
                                )
                            )
                        ) : (
                            <React.Fragment>
                                <div>No Goals</div>
                                <Link to={`/clients/${this.state.client.id}/goals/new`}>
                                    <Button color="primary">Add One?</Button>
                                </Link>
                            </React.Fragment>
                        )
                        }
                    </Col>
                    }
                </Row>
                {this.state.session && 
                <Row className="mt-3">
                    <Col>
                        <Button color="danger" onClick={this.deleteSession} block>Delete Session</Button>
                    </Col>
                </Row>
                }
            </Container>
        )
    }
}

export default withRouter(EditSession);