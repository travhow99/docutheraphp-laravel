import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import {
    Container, Row, Col,
    Card, CardBody, CardTitle, CardFooter, Button, CardText, Form, Input, Label
} from 'reactstrap';
import SessionGoal from './SessionGoal';

class AddSession extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: null,
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);

        axios.post(`/api/clients/${id}/sessions`).then((response) => {
            window.location.href = `/clients/${id}/sessions/${response.data.session.id}`;

            this.setState({
                client: response.data.client,
                session: response.data.session,
                goals: response.data.goals,
            });

            console.log(this.state);
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
            <div className="client-container">
                <Row className="mt-4">
                    {this.state.client && 
                        <Col>
                            <h2>{this.state.client.name}</h2>
                            <Card className="p-4">
                                {this.state.goals.length > 0 ? 
                                    this.state.goals.map((goal, index) => (
                                        <SessionGoal key={index} goal={goal} />
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
            </div>
        )
    }
}

export default withRouter(AddSession);