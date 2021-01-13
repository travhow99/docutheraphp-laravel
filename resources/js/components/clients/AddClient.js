import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import { 
    Container, Row, Col,
    Card, CardBody, Button,
    Form, FormGroup, FormFeedback, Label
} from 'reactstrap';

class AddClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        }
        
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log('ADD', this.props);
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

        axios.post(`/api/clients`, clientData).then((response) => {
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
            <Col>
                <Card className="mb-3">
                    <CardBody>
                        <h3>New Client</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="name">Client Name</Label>
                                <input id="name" type="text" name="name" placeholder="Client Name (4 Letter Abbreviation)" className="form-control" onChange={this.handleInput} maxLength="4" required />
                            </FormGroup>

                            <FormGroup>
                                <Label for="session_day">Session Day</Label>
                                <select id="sessionDay" name="session_day" className="form-control"
                                onChange={this.handleInput}
                                defaultValue=''
                                >
                                    <option defaultValue="" /* selected={!this.state.client.session_day} */>Session Day</option>
                                    {this.state.days.map((day, i) => (
                                        <option defaultValue={day} key={i}
                                        /* selected={this.state.client.session_day === day} */>{day}</option>
                                    ))}
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <Label for="session_time">Session Time</Label>
                                <input id="session_time" type="time" name="session_time" placeholder="Session Time" className="form-control" onChange={this.handleInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="agency">Agency</Label>
                                <input id="agency" type="text" name="agency" placeholder="Agency" className="form-control" onChange={this.handleInput} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="start_date">Start Date</Label>
                                <input id="start_date" type="date" name="start_date" placeholder="Start Date" className="form-control" onChange={this.handleInput} />
                            </FormGroup>

                            <FormGroup>
                                <Button type="submit" color="primary" size="lg" block onSubmit={this.handleSubmit}>
                                    Submit
                                </Button>
                            </FormGroup>

                        </Form>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

export default AddClient;