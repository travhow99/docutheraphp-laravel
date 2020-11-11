import React from 'react';
import { Input, FormGroup, Label, Row, Col } from 'reactstrap';

const CheckboxGroup = (props) => {
    console.log(props.max);
    return (
        <React.Fragment>
            <FormGroup check inline className="w-100">
                <Row className="w-100">
                {props.options.map((opt, index) => (
                    <Col key={index}>
                        <Label>
                            <Input
                                type="checkbox"
                                name="goal"
                                onChange={props.onChange}
                                value={opt.value || ''}
                                placeholder={'Add a session note...'}
                            />
                            {opt.label}
                        </Label>
                    </Col>
                ))}
                </Row>
            </FormGroup>

        </React.Fragment>
    )
}

export default CheckboxGroup;