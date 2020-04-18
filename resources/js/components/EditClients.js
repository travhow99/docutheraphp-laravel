import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import { 
    Container, Row, Col,
    Card, CardBody, Button,
    Form, FormGroup, FormFeedback, Label
} from 'reactstrap';

class EditClient extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.client.start_date);
        this.state = {
            client: {
                ...this.props.client,
                start_date: this.props.client.start_date ? this.props.client.start_date.substr(0, 10) : null,
            },
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        }
        
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.state);
    }

    componentDidUpdate() {
        console.log(this.state);
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
            <Container>
                <Row className="mt-4">
                    <Col>
                        <Card>
                            <CardBody>
                                <h3>Edit Client</h3>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup row>
                                        <select id="sessionDay" name="session_day" className="form-control"
                                        onChange={this.handleInput}
                                        defaultValue={this.state.client.session_day || 'default'}
                                        >
                                            <option defaultValue="default" disabled /* selected={!this.state.client.session_day} */>Session Day</option>
                                            {this.state.days.map((day, i) => (
                                                <option defaultValue={day} key={i}
                                                /* selected={this.state.client.session_day === day} */>{day}</option>
                                            ))}
                                        </select>
                                    </FormGroup>
                                    <FormGroup row>
                                        <input id="session_time" type="time" name="session_time" placeholder="Session Time" className="form-control" onChange={this.handleInput} defaultValue={this.state.client.session_time} required />
                                    </FormGroup>
                                    <FormGroup row>
                                        <input id="start_date" type="date" name="start_date" placeholder="Start Date" className="form-control" onChange={this.handleInput} defaultValue={this.state.client.start_date} required />
                                    </FormGroup>
                                    <FormGroup row>
                                        <input id="agency" type="text" name="agency" placeholder="Agency" defaultValue={this.state.client.agency} className="form-control" onChange={this.handleInput} required />
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col>
                                            <Button type="submit" color="primary" size="lg" block onSubmit={this.handleSubmit}>
                                                Submit
                                            </Button>
                                        </Col>
                                    </FormGroup>

                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default EditClient;