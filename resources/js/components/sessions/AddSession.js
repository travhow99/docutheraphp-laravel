import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import {
    Container, Row, Col,
    Card, CardBody, CardTitle, CardFooter, Button, CardText, Form, Input, Label
} from 'reactstrap';
import Pill from '../utilities/Pill';

class AddSession extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: null,
        }

        this.toggleEdit = this.toggleEdit.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);

        axios.get(`/api/clients/${id}/goals`).then((response) => {
            this.setState({
                client: response.data.client,
                goals: response.data.goals,
            });

            console.log(this.state);
        })
    }

    toggleEdit(e) {
        e.preventDefault();
        const key = e.target.getAttribute('data-goal_index');

        const goals = this.state.goals;
        goals.map((goal) => {
            goal.editing = false;
        })
        goals[key].editing = true;

        this.setState({
            ...this.state,
            goals,
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
        return(
            <Container>
                <Row className="mt-4">
                    {this.state.client && 
                        <Col>
                            <h2>{this.state.client.name}</h2>
                            <Card className="p-4">
                                {this.state.goals.length > 0 ? 
                                    this.state.goals.map((goal, index) => (
                                        <React.Fragment key={index}>
                                            <Row>
                                                <Col>
                                                    <h3>Goal:</h3>
                                                    <p>{goal.goal}</p>
                                                    <h3>Objective:</h3>
                                                    <p>{goal.objective}</p>
                                                </Col>
                                                <Col className="flex-end">
                                                    <Button color='success' data-goal_index={index} onClick={this.toggleEdit}>Add Note</Button>
                                                </Col>
                                            </Row>
                                            {goal.editing && 
                                            // TODO: turn into component
                                                <React.Fragment>
                                                    <Row className="mt-2">
                                                        <Col className="col-9">
                                                            <Input type="textarea"></Input>
                                                        </Col>
                                                        <Col>
                                                            <Button color="danger">-</Button>
                                                            <Button color="success">+</Button>
                                                            <br />
                                                            <span>{goal.count || 0}</span>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Label>Did not meet objective</Label>
                                                            <Input type="checkbox" />
                                                        </Col>
                                                        <Col>
                                                            <Label>Met objective</Label>
                                                            <Input type="checkbox" />
                                                        </Col>
                                                    </Row>
                                                </React.Fragment>
                                            }
                                        </React.Fragment>
                                    ))
                                :
                                <React.Fragment>
                                    <div>No Goals</div>
                                    <Link to={`/clients/${this.state.client.id}/goals/new`}>
                                        <Button color="primary">Add One?</Button>
                                    </Link>
                                </React.Fragment>
                                }
                                {/* 
                                    map(g&o {
                                        Goals:
                                        Objectives:
                                                    -> add note
                                                        -> textarea Notes
                                                        -> - / + to tally (times met)
                                                        -> Met / Did not meet objective
                                    }

                                */}
                                {/* Add Notes */}
                            </Card>
                        </Col>
                    }
                </Row>
            </Container>
        )
    }
}

export default withRouter(AddSession);