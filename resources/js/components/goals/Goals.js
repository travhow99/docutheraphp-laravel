import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {
    Container, Row, Col,
    Card, CardBody, CardTitle, CardFooter, Button, CardText, Form
} from 'reactstrap';
import Pill from '../utilities/Pill';
import SessionGoal from '../sessions/SessionGoal';
import AddGoal from './AddGoal';

class Goals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }

        this.addGoal = this.addGoal.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;

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
        let clientData = this.state.client;
        console.log(clientData);

        // TODO: 
        axios.put(`/api/clients/${this.state.client.id}/goals`, clientData).then((response) => {
            console.log(response);
            return response;
        }).then((json) => {
            if (json.status === 201) {
                console.log(json.data);

                this.props.return();
            }
        })

    }

    addGoal() {
        axios.get(`/api/clients/${this.state.client.id}/goals`).then((response) => {
            this.setState({
                client: response.data.client,
                goals: response.data.goals,
            });

            console.log(this.state);
        })
    }

    render() {
        return(
            <Container>
            {this.state.client ? (
                <React.Fragment>
                    <Row className="mt-4">
                        <Col>
                            <h3>Goals for {this.state.client.name}</h3>
                            <div className="mt-4">
                                <h5>Current Goals</h5>
                                {this.state.goals.length >= 1 ? 
                                    this.state.goals.map((goal, key) => (
                                        <Card key={key} className="p-4 mt-2">
                                            <SessionGoal 
                                                goal={goal} 
                                                client_id={this.state.client.id}
                                                master
                                            />
                                        </Card>
                                    )) : (
                                        <p>Add a goal below!</p>
                                    )}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AddGoal 
                                client={this.state.client}
                                return={this.addGoal} 
                            />
                        </Col>
                    </Row>
                    {/* TODO: list past goals */}
                    {false &&
                    <Row>
                        <Col>
                            <div className="mt-4">
                                <h5>Past Goals</h5>
                                {/* <Pill
                                    target={`/clients/${this.state.client.id}/goals/new`} 
                                    main={[
                                        this.state.client.session_day,
                                        this.state.client.next_session,
                                        this.state.client.session_time,
                                    ]} 
                                    status={0} /> */}
                            </div>
                        </Col>
                    </Row>
                    }
                </React.Fragment>
            ) : (
                <Row>
                    <Col>
                        <h3>Loading</h3>
                    </Col>
                </Row>
            )
        }
        </Container>
        )
    }
}

export default withRouter(Goals);