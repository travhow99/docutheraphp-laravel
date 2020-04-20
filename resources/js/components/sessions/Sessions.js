import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {
    Container, Row, Col,
    Card, CardBody, CardTitle, CardFooter, Button, CardText, Form
} from 'reactstrap';

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

        axios.put(`/api/sessions/${this.state.client.id}`, clientData).then((response) => {
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
                    <Col>
                        {this.state.client && 
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        <h3>{this.state.client.name}</h3>
                                    </CardTitle>
                                    <Form>
                                        <FormGroup row>
                                            <input id="session_time" type="time" name="session_time" placeholder="Session Time" className="form-control" onChange={this.handleInput} defaultValue={this.state.client.session_time} required />
                                        </FormGroup>

                                        <FormGroup row>
                                            <Col>
                                                <Button type="submit" color="primary" size="lg" block onSubmit={this.handleSubmit}>
                                                    Save
                                                </Button>
                                            </Col>
                                        </FormGroup>

                                    </Form>
                                </CardBody>
                            </Card>
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(Sessions);