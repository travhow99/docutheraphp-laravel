import React from 'react';
import { Input, FormGroup, Label, Row, Col } from 'reactstrap';

const CheckboxGroup = (props) => {
    console.log(props.options);
    return (
        <React.Fragment>
            <FormGroup check inline className="w-100">
                <Row>
                {props.options.map((opt, index) => (
                    <Col>
                        <Label key={index}>
                            <Input
                                type="checkbox"
                                name="goal"
                                onChange={props.onChange}
                                onBlur={props.submit}
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