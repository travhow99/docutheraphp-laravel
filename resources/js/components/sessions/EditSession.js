import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter, Link, Redirect } from 'react-router-dom';
import {
    Row, Col,
    Card, Button,
    Input, Label
} from 'reactstrap';
import SessionGoal from './SessionGoal';
import ToggleSwitch from '../utilities/ToggleSwitch';
import DatePicker from "react-datepicker";
import { GoGear } from 'react-icons/go';
import { getSessionAttribute, toLocalTime } from '../helpers/functions';
import SessionNote from './SessionNote';
import SessionPoc from './SessionPoc';

import "react-datepicker/dist/react-datepicker.css";

class EditSession extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: null,
            goals: [],
            possible_goals: [],
            editingDate: false,
            deleted: false,
        }

        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.submitNoteChange = this.submitNoteChange.bind(this);
        this.toggleEditDate = this.toggleEditDate.bind(this);
        this.toggleAttribute = this.toggleAttribute.bind(this);
        this.deleteSession = this.deleteSession.bind(this);
        this.submitSessionAttribute = this.submitSessionAttribute.bind(this);
        this.setAttribute = this.setAttribute.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const session_id = this.props.match.params.session_id;

        axios.get(`/api/clients/${id}/sessions/${session_id}`).then((response) => {
            console.log('mount response:', response)
            this.setState({
                client: response.data.client,
                session: response.data.session,
                goals: response.data.goals,
            });

            // If session has no goals, check for existing client goals
            if (!response.data.goals.length) {
                console.log('no goals, find them!')
                axios.get(`/api/clients/${id}/goals`).then((response) => {
                    this.setState({
                        possible_goals: response.data.goals,
                    });

                    console.log(this.state);
                })
            }
        })
    }

    toggleEditDate() {
        this.setState({ editingDate: !this.state.editingDate });
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

    setAttribute(e) {
        e.preventDefault();

        const name = e.target.name;
        const val = e.target.value;

        console.log(e, name, val);

        axios.post(`/api/sessionAttributes`, {
            name,
            attribute: val,
            attributable_id: this.state.session.id,
        })
        .then((json) => {

            if (json.status === 200) {
                console.log(json.data);

                /* this.setState({
                    session: {
                        ...this.state.session,
                        [name]: val,
                    },
                }); */
            }
        })

        return;


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

    handleNoteChange(e) {
        let value = e.target.value;

        this.setState({
            session: {
                ...this.state.session,
                notes: value,
            }
        });
    }

    submitNoteChange() {
        axios.put(`/api/clients/${this.state.client.id}/sessions/${this.state.session.id}`, {
            notes: this.state.session.notes,
        })
        .catch((err) => console.log(err));
    }

    submitSessionAttribute(e) {
        let val = e.target.value;

        axios.post(`/api/sessionAttributes`, {
            name: 'POC',
            attribute: val,
            attributable_id: this.state.session.id,
        })
        .catch((err) => console.log(err));
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
        console.log('STATE:', this.state);
        const time = this.state.session ? this.state.session.session_date + " " + this.state.session.session_time : null;

        const datepicker = moment(time).toDate();

        if (this.state.deleted) {
            return <Redirect to={`/clients/${this.state.client.id}/sessions`} />
        }

        return (
            <div className="client-container">
                {this.state.session &&
                    <Row className="mt-4">
                        <Col xs="4">
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
                            {this.state.session.complete &&
                                <div className="d-flex">
                                    <div className="mt-3 mr-3">
                                        <div>
                                            <Label for="session_units" className="mb-0">Units</Label>
                                            <Input 
                                                type="number" 
                                                name="session_units" id="session_units" 
                                                defaultValue={getSessionAttribute(this.state.session.session_attributes, 'session_units', '0')} 
                                                placeholder={getSessionAttribute(this.state.session.session_attributes, 'session_units', '0')} 
                                                min="0" 
                                                onBlur={this.setAttribute} 
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3 mr-3">
                                        <div>
                                            <Label for="unit_cost" className="mb-0">Cost</Label>
                                            {/* 
                                                @todo
                                                Set default attribute from client/agency setting? Check with @alli
                                            */}
                                            <Input 
                                                type="number" 
                                                name="unit_cost" id="unit_cost" 
                                                defaultValue={getSessionAttribute(this.state.session.session_attributes, 'unit_cost', '0')}
                                                placeholder={getSessionAttribute(this.state.session.session_attributes, 'unit_cost', '0')} 
                                                min="0" 
                                                step="0.05"
                                                onBlur={this.setAttribute} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
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
                                ))
                            ) : (
                                <React.Fragment>
                                    <div>No goals for this session</div>
                                    <Link to={`/clients/${this.state.client.id}/goals/new`}>
                                        <Button color="primary">Add One?</Button>
                                    </Link>
                                    {this.state.possible_goals.length > 0 &&
                                        <Input type="select">
                                            {this.state.possible_goals.map((goal, index) => (
                                                <option key={index} value={goal.id}>{goal.goal}</option>
                                            ))}
                                        </Input>
                                    }
                                </React.Fragment>
                            )
                            }
                        </Col>
                    }
                </Row>
                {this.state.session &&
                    <React.Fragment>
                        <Row className="mt-3">
                            <Col>
                                <Card className="p-4 mb-3">
                                    <SessionNote
                                        text={this.state.session.notes}
                                        onChange={this.handleNoteChange}
                                        submit={this.submitNoteChange}
                                    />
                                </Card>
                            </Col>
                        </Row>
                        {/* POC: continue poc, modify poc, discontinue poc */}
                        <Row className="mt-3">
                            <Col className="p-4 mb-3">
                                <SessionPoc
                                    submit={this.submitSessionAttribute}
                                    selected={this.state.session.session_attributes.length ? this.state.session.session_attributes[0].attribute : null}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Button color="danger" onClick={this.deleteSession} block>Delete Session</Button>
                            </Col>
                        </Row>
                    </React.Fragment>
                }
            </div>
        )
    }
}

export default withRouter(EditSession);