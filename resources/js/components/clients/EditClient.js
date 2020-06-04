import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect, withRouter } from 'react-router-dom';
import { 
    Container, Row, Col,
    Card, CardBody, Button,
    Form, FormGroup, FormFeedback, Label
} from 'reactstrap';

class EditClient extends Component {
    constructor(props) {
        super(props);
        console.log('edit props',props);

        this.state = {
            client: {
                id: null,
                start_date: null,
                session_time: null,
                agency: null,
            },
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        }
        
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        this.setState({client: {...this.state.client, [e.target.name]: e.target.value}});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ formSubmitting: true });
        let clientData = this.state.client;
        console.log(clientData);

        axios.put(`/api/clients/${this.state.client.id}`, clientData).then((response) => {
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
        return (
            <div className="client-container">
                <Row className="mt-4">
                    <Col>
                        <Card>
                            <CardBody>
                                <h3>Edit Client</h3>
                                <h5>{this.props.client.name}</h5>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup row>
                                        <select id="sessionDay" name="session_day" className={`form-control ${!this.props.client.session_time ? 'is-invalid' : ''}`}
                                        onChange={this.handleInput}
                                        defaultValue={this.props.client.session_day || 'default'}
                                        >
                                            <option defaultValue="default" disabled>Session Day</option>
                                            {this.state.days.map((day, i) => (
                                                <option defaultValue={day} key={i}
                                                >{day}</option>
                                            ))}
                                        </select>
                                    </FormGroup>
                                    <FormGroup row>
                                        <input id="session_time" type="time" name="session_time" placeholder="Session Time" className={`form-control ${!this.props.client.session_time ? 'is-invalid' : ''}`} onChange={this.handleInput} defaultValue={this.props.client.session_time} required />
                                    </FormGroup>
                                    <FormGroup row>
                                        <input id="start_date" type="date" name="start_date" placeholder="Start Date" className={`form-control ${!this.props.client.start_date ? 'is-invalid' : ''}`} onChange={this.handleInput} defaultValue={this.props.client.start_date} required />
                                    </FormGroup>
                                    <FormGroup row>
                                        <input id="agency" type="text" name="agency" placeholder="Agency" defaultValue={this.props.client.agency} className={`form-control ${!this.props.client.agency ? 'is-invalid' : ''}`} onChange={this.handleInput} required />
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col>
                                            <Button type="submit" color="primary" size="lg" block>
                                                Submit
                                            </Button>
                                        </Col>
                                    </FormGroup>

                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EditClient;