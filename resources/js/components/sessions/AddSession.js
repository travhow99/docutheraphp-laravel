import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {
    Container, Row, Col,
    Card, CardBody, CardTitle, CardFooter, Button, CardText, Form
} from 'reactstrap';
import Pill from '../utilities/Pill';

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

        axios.get(`/api/clients/${id}/goals`).then((response) => {
            this.setState({
                client: response.data.client,
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
            <Container>
                <Row className="mt-4">
                    {this.state.client && 
                        <Col>
                            <Card>
                                <CardTitle>{this.state.client.name}</CardTitle>
                                {this.state.goals.length > 0 ? 
                                    this.state.goals.map((goal, index) => {
                                        <Pill 
                                            key={index}
                                            main={[
                                                goal.goal,
                                                goal.objective
                                            ]}
                                        />
                                    })
                                :
                                <div>No Sessions</div>
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