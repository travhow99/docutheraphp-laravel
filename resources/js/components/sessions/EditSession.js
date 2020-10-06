import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter, Link, Redirect } from 'react-router-dom';
import {
    Row, Col,
    Card, Button
} from 'reactstrap';
import SessionGoal from './SessionGoal';
import ToggleSwitch from '../utilities/ToggleSwitch';
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
        this.toggleAttribute = this.toggleAttribute.bind(this);
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

    toggleAttribute(e) {
        e.preventDefault();

        const name = e.target.name;
        const val = e.target.checked;
       

        axios.put(`/api/clients/${this.state.client.id}/sessions/${this.state.session.id}`, {
            [name]: val,
        })
        .then((response) => response)
        .then((json) => {
            if (json.status === 200) {
                console.log(json.data);

                this.setState({
                    session: {
                        ...this.state.session,
                        [name]: val,
                    },
                });
            }
        })
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
        })
        .then((response) => response)
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

        if (this.state.deleted) {
            return <Redirect to={`/clients/${this.state.client.id}/sessions`} />
        }
        
        return(
            <div className="client-container">
                {this.state.session && 
                    <Row className="mt-4">
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
                                <GoGear 
                                    className="flex-0 ml-2 c-pointer" 
                                    onClick={this.toggleEditDate} />
                            </div>
                        </Col>
                        <Col className="d-flex">
                            <div>
                                <div className="mt-3 mr-2">Completed?
                                    <br />
                                    <ToggleSwitch name="complete" isChecked={this.state.session.complete} toggle={this.toggleAttribute} />
                                </div>
                            </div>
                            <div>
                                <div className="mt-3 mr-2">Cancelled?
                                    <br />
                                    <ToggleSwitch name="cancelled" isChecked={this.state.session.cancelled} toggle={this.toggleAttribute} />
                                </div>
                            </div>
                            <div>
                                <div className="mt-3 mr-3">Billed?
                                    <br />
                                    <ToggleSwitch name="billed" isChecked={this.state.session.billed} toggle={this.toggleAttribute} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                }
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
            </div>
        )
    }
}

export default withRouter(EditSession);