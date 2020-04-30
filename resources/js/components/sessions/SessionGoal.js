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
        this.saveNote = this.saveNote.bind(this);
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

    saveNote(e) {
        e.preventDefault();

        console.log(e.target.value);
        axios.put(`/api/sessions/${this.state.goal.session_id}/sessionGoals/${this.state.goal.id}`, {
            notes: e.target.value,
        })
        .then((response) => {
            this.setState({goal: response.data})
        })
        .catch((err) => console.log(err));
    }

    adjustCount(e) {
        let count = this.state.goal.count;

        switch(e.target.name) {
            case 'minus':
                count = count - 1;
                break;
            case 'plus':
                count = count + 1;
                break;
            default:
                return;
        }

        axios.put(`/api/sessions/${this.state.goal.session_id}/sessionGoals/${this.state.goal.id}`, {
            count: count,
        })
        .then((response) => {
            this.setState({goal: response.data})
        })
        .catch((err) => console.log(err));
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
                            {/* TODO: use value & onChange? */}
                            <Input type="textarea" onBlur={this.saveNote} defaultValue={this.state.goal.notes}></Input>
                        </Col>
                        <Col>
                            <div>
                                <Button color="danger" name="minus" onClick={this.adjustCount} disabled={this.state.goal.count === 0}>-</Button>
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