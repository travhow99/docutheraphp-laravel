import React from 'react';
import { Row, Col, Input, Label, Button, ButtonGroup } from 'reactstrap';
import ToggleSwitch from '../utilities/ToggleSwitch';

/**
 * @todo  Functional checkboxes
 */
const GoalNote = (props) => {
    return (
        <div className="d-flex flex-column mt-4">
            <div className="d-flex">
                <div className="flex-1 pr-2">
                    {/* TODO: use value & onChange? */}
                    <Input type="textarea" onBlur={props.save} defaultValue={props.goal.notes} />
                </div>
                <div className="d-flex">
                    <ButtonGroup>
                        <Button className="h-100" color="danger" name="minus" onClick={props.adjustCount} disabled={props.goal.count === 0}>-</Button>
                        <div className="border-top border-bottom p-2 d-flex align-items-center">
                            <div style={{fontSize: '1rem'}}>{props.goal.count || 0}</div>
                        </div>                                
                        <Button className="h-100" color="success" name="plus" onClick={props.adjustCount}>+</Button> 
                    </ButtonGroup>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div>
                    <div className="mt-3">
                        Met Objective?&nbsp;
                        <ToggleSwitch className="ml-2" isChecked={props.goal.met_objective} toggle={props.toggleMetObjective} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoalNote;