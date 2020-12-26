import React, { Component } from 'react';
import { Row, Col, Button, Input, Label } from 'reactstrap';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import GoalNote from '../goals/GoalNote';
import GoalAttribute from '../goals/GoalAttribute';

class SessionGoal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goal: {},
            editing: false,
            takingNote: false,
        }

        console.log(this.props, this.state);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleNote = this.toggleNote.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.adjustCount = this.adjustCount.bind(this);
        this.updateGoalInput = this.updateGoalInput.bind(this);
        this.updateGoal = this.updateGoal.bind(this);
        this.toggleMetObjective = this.toggleMetObjective.bind(this);
    }

    componentDidMount() {
        this.setState({goal: this.props.goal});
    }

    toggleEdit() {
        this.setState({editing: !this.state.editing});
    }

    toggleNote() {
        this.setState({takingNote: !this.state.takingNote})
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

    updateGoalInput(e) {
        let value = e.target.value;
        let name = e.target.name;

        this.setState({goal: {...this.state.goal, [name]: value}});
    }

    updateGoalProgress(e) {
        e.preventDefault();

        let [name, value] = e;
        console.log(e.target.checked);
    }

    updateGoal() {
        axios.put(`/api/clients/${this.props.client_id}/goals/${this.state.goal.id}`, this.state.goal)
            .then((response) => {
                this.setState({goal: response.data})
            })
            .catch((err) => console.log(err));
    }

    toggleMetObjective(e) {
        let goal = this.state.goal;
        goal.met_objective = e.target.checked;

        axios.put(`/api/sessions/${this.state.goal.session_id}/sessionGoals/${this.state.goal.id}`, goal)
            .then((response) => {
                this.setState({goal: response.data})
            })
            .catch((err) => console.log(err));

        // let [name, value] = e;


    }

    render() {
        return (
            <React.Fragment>
                {this.state.goal.met_objective ? 
                    <div className="text-right">
                        Objective Met!
                    </div>
                    :
                    ''
                }
                <Row>
                    <Col xs="auto">
                        <h3>Goal:</h3>
                        {this.props.master && this.state.editing ? (
                            <Input 
                                type="textarea" 
                                name="goal"
                                onChange={this.updateGoalInput}
                                onBlur={this.updateGoal}
                                value={this.state.goal.goal} 
                                placeholder={this.state.goal.goal} />
                        ) : (
                            <p style={{whiteSpace: "pre-line",}}>{this.state.goal.goal}</p>
                        )}
                        <h3>Objective:</h3>
                        {this.props.master && this.state.editing ? (
                            <Input 
                                type="textarea" 
                                name="objective"
                                onChange={this.updateGoalInput}
                                onBlur={this.updateGoal}
                                value={this.state.goal.objective}
                                placeholder={this.state.goal.objective} />
                        ) : (        
                            <p style={{whiteSpace: "pre-line",}}>{this.state.goal.objective}</p>
                        )}
                    </Col>
                    <Col className="flex-end">
                        {this.props.master ? (
                            <Button color={this.state.editing ? 'primary' : 'success'} onClick={this.toggleEdit}>
                                {this.state.editing ? 'Save' : 'Edit'}
                            </Button>
                        ) : (
                            <Button color={this.state.takingNote ? 'danger' : 'success'} onClick={this.toggleNote}>
                                {this.state.takingNote ? <FaTimes /> : 'Notes'}
                            </Button>
                        )}
                    </Col>
                </Row>
                {!this.props.master &&
                    <React.Fragment>
                        {this.state.takingNote &&
                            <React.Fragment>
                                <GoalNote 
                                    save={this.saveNote} 
                                    goal={this.state.goal}
                                    adjustCount={this.adjustCount}
                                    updateStatus={this.updateGoalProgress}
                                    toggleMetObjective={this.toggleMetObjective}
                                />
                                {/* @todo */}
                                <GoalAttribute

                                />
                            </React.Fragment>
                        }
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default SessionGoal;