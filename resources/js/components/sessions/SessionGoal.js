import React, { Component } from 'react';
import { Row, Col, Button, Input, Label } from 'reactstrap';
import axios from 'axios';

class SessionGoal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goal: {},
            editing: false,
        }

        console.log(this.props, this.state);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.adjustCount = this.adjustCount.bind(this);
    }

    componentDidMount() {
        console.log('props:',this.props);
        this.setState({goal: this.props.goal});
        console.log('state',this.state);
    }

    toggleEdit() {
        this.setState({editing: !this.state.editing});
    }

    adjustCount(e) {
        switch(e.target.name) {
            case 'minus':
                this.setState({goal: {...this.state.goal, count: this.state.goal.count - 1}});
                break;
            case 'plus':
                this.setState({goal: {...this.state.goal, count: this.state.goal.count + 1}});
                break;
            default:
                break;
        }
        console.log(this.state.goal);

        axios.put(`/api/sessions/${this.state.goal.session_id}/sessionGoals/${this.state.goal.id}`, {
            goal: this.state.goal,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        console.log(this.state);

        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <h3>Goal:</h3>
                        <p>{this.state.goal.goal}</p>
                        <h3>Objective:</h3>
                        <p>{this.state.goal.objective}</p>
                    </Col>
                    <Col className="flex-end">

                        <Button color='success' onClick={this.toggleEdit}>{this.state.editing ? 'Close Note' : 'Add Note'}</Button>
                    </Col>
                </Row>
                {this.state.editing &&
                // TODO: turn into component
                <React.Fragment>
                    <Row className="mt-2">
                        <Col className="col-9">
                            <Input type="textarea"></Input>
                        </Col>
                        <Col>
                            <div>
                                <Button color="danger" name="minus" onClick={this.adjustCount}>-</Button>
                                <span>
                                    {this.state.goal.count || 0}
                                </span>                                
                                <Button color="success" name="plus" onClick={this.adjustCount}>+</Button> 
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="form-check">
                            <Input type="checkbox" />
                            <Label className="form-check-label">Did not meet objective</Label>
                        </Col>
                        <Col className="form-check">
                            <Input type="checkbox" />
                            <Label className="form-check-label">Met objective</Label>
                        </Col>
                    </Row>
                </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default SessionGoal;