import React, { useState } from 'react';
import { Input, FormGroup, Label, Row, Col } from 'reactstrap';

const CheckboxGroup = (props) => {
    const [checked, setChecked] = useState(props.selected);

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
                                onChange={() => {
                                    props.onChange;
                                    setChecked(opt.value);
                                }}
                                value={opt.value || ''}
                                checked={checked === opt.value}
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