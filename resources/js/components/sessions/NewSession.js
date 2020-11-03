import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Col, Form, FormGroup } from 'reactstrap';
import ReactDatePicker from 'react-datepicker';
import { FaTimesCircle } from 'react-icons/fa';
import { DateTime } from 'luxon';

const NewSession = (props) => {
    const currentDate = DateTime.local();

    console.log(currentDate);

    const handleTimeChange = (time) => {
        console.log(time);
    }

    const handleSubmit = (e) => {
        console.log(e);
    }

    return (
        <Col>
            <Card>
                <CardHeader>
                    New Session
                <FaTimesCircle className="float-right c-pointer" onClick={props.addSession} />
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup row>
                            <ReactDatePicker
                                showTimeSelect
                                dateFormat="Pp"
                                timeIntervals={5}
                                onChange={handleTimeChange}
                                className="form-control"
                                required
                            />
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    )
}

export default NewSession;