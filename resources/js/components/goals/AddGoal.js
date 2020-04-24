import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import {
    Container, Row, Col,
    Card, CardBody, CardTitle, CardFooter, Button, CardText, Form, FormGroup, Label, Input
} from 'reactstrap';
import Pill from '../utilities/Pill';

class AddGoal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);

        axios.get(`/api/clients/${id}`).then((response) => {
            this.setState({
                client: response.data,
            });

            console.log(this.state);
        })
    }

    handleChange(e) {
        e.preventDefault();
        let value = e.target.value;
        let name = e.target.name;

        this.setState({
            [name]: value,
        });
        console.log(this.state);
    }


    handleSubmit(e) {
        e.preventDefault();

        this.setState({ formSubmitting: true });

        axios.post(`/api/clients/${this.state.client.id}/goals`, {
            goal: this.state.goal,
            objective: this.state.objective,
        }).then((json) => {
            if (json.status === 201) {
                // this.props.return();
            }
        })

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
                            <Card className="py-4">
                                <CardTitle className="text-center"><h3>New Goal & Objective for {this.state.client.name}</h3></CardTitle>
                                <CardBody>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <Label>Goal:</Label>
                                            <Input type="textarea" name="goal" id="goal" onChange={this.handleChange}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Objective:</Label>
                                            <Input type="textarea" name="objective" id="objective" onChange={this.handleChange}/>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col>
                                                <Button type="submit" color="primary" size="lg" block>
                                                    Save
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
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

export default withRouter(AddGoal);