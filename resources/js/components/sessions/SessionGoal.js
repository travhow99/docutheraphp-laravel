import React, { Component } from 'react';
import { Row, Col, Button, Input, Label } from 'reactstrap';
import axios from 'axios';
import GoalNote from '../goals/GoalNote';

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
                        {this.props.master ? (
                            <Button color="success">
                                Edit
                            </Button>
                        ) : (
                            <Button color='success' onClick={this.toggleEdit}>
                                {this.state.editing ? 'Close Note' : 'Add Note'}
                            </Button>
                        )}
                    </Col>
                </Row>
                {!this.props.master &&
                    <React.Fragment>
                        {this.state.editing &&
                            <GoalNote 
                                save={this.saveNote} 
                                goal={this.state.goal}
                                adjustCount={this.adjustCount} 
                            />
                        }
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default SessionGoal;