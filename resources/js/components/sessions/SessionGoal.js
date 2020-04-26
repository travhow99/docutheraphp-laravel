import React, { Component } from 'react';
import { Row, Col, Button, Input, Label } from 'reactstrap';

class SessionGoal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            count: this.props.count,
        }

        console.log(this.props, this.state);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    toggleEdit() {
        this.setState({editing: !this.state.editing});
    }

    adjustCount(e) {
        switch(e.target.name) {
            case 'minus':
                this.setState({count: this.state.count - 1})
                break;
            case 'plus':
                this.setState({count: this.state.count + 1})
                break;
            default:
                break;
        }
    }

    render() {
        const goal = this.props.goal;

        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <h3>Goal:</h3>
                        <p>{goal.goal}</p>
                        <h3>Objective:</h3>
                        <p>{goal.objective}</p>
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
                                    {goal.count || 0}
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