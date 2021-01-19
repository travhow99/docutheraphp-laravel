import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { withRouter } from 'react-router-dom';
import {
    Row, Col,
    Card, Table, Button, CardText, Form, FormGroup, CardHeader, CardBody, CardFooter
} from 'reactstrap';
import AddInvoice from './AddInvoice';

const Invoices = (props) => {
    const [adding, setAdding] = useState(false);

    return (
        <div className="client-container">
            <Row className="mt-4">
                <Col>
                    {!adding ?
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
                                                <tr key={index} index={index}>
                                                    <td>
                                                        <span className="bg-danger px-2 py-1 rounded-pill text-white">
                                                            Unbilled
                                                        </span>
                                                    </td>
                                                    <td>{invoice.invoice_name}</td>
                                                    <td>{invoice.invoice_details}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <BsThreeDotsVertical className="c-pointer" />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    :
                                    <div>
                                        No Invoices exist for this client. Create one below!
                                        </div>
                                }

                            </CardBody>
                            <CardFooter>
                                <Button onClick={() => setAdding(true)}>
                                    Add Invoice
                                </Button>
                            </CardFooter>
                        </Card>
                        :
                        <AddInvoice setAdding={setAdding} agency={props.client.agency} client_id={props.client.id} />
                    }
                </Col>
            </Row>
        </div>

    )
}

export default withRouter(Invoices);