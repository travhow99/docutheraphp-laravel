import React from 'react';
import { Row, Col, Input, Label, Button } from 'reactstrap';

/**
 * @todo  Functional checkboxes
 */
const GoalNote = (props) => {
    return (
        <React.Fragment>
            <Row className="mt-2">
                <Col className="col-9">
                    {/* TODO: use value & onChange? */}
                    <Input type="textarea" onBlur={props.save} defaultValue={props.goal.notes}></Input>
                </Col>
                <Col>
                    <div>
                        <Button color="danger" name="minus" onClick={props.adjustCount} disabled={props.goal.count === 0}>-</Button>
                        <span>
                            {props.goal.count || 0}
                        </span>                                
                        <Button color="success" name="plus" onClick={props.adjustCount}>+</Button> 
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="form-check">
                    <Input type="checkbox" onChange={props.updateStatus} />
                    <Label className="form-check-label">Did not meet objective</Label>
                </Col>
                <Col className="form-check">
                    <Input type="checkbox" onChange={props.updateStatus} />
                    <Label className="form-check-label">Met objective</Label>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default GoalNote;