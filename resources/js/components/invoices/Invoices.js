import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Row, Col,
    Card, Table, Button, CardText, Form, FormGroup, CardHeader, CardBody
} from 'reactstrap';

const Invoices = (props) => {

    return (
        <div className="client-container">
                <Row className="mt-4">
                    <Col>
                        <Card>
                            <CardBody>
                                <h5>Invoices</h5>
                                    {props.invoices.length >= 1 ?
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Status</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Sessions</th>
                                                <th>Units</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {console.log(props.invoices)}
                                            {props.invoices.map((invoice, index) => (
                                                <ContactRow key={index} index={index} invoice={invoice} /* updateContact={updateContact} deleteContact={deleteContact} */ />
                                            ))}
                                        </tbody>
                                    </Table>
                                    :
                                    <div>
                                        No Invoices exist for this client. Create one?
                                    </div>
                                    }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
        </div>

    )
}

export default withRouter(Invoices);