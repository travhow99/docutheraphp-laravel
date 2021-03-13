import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useHistory } from 'react-router';
import {
    Row, Col,
    Card, Table, Button, CardText, Form, FormGroup, CardHeader, CardBody, CardFooter
} from 'reactstrap';
import DropdownMenu from '../utilities/DropdownMenu';
import AddInvoice from './AddInvoice';

const Invoices = (props) => {
    const history = useHistory();
    const [adding, setAdding] = useState(false);

    const editInvoice = (id) => {
        return 
    }

    const deleteInvoice = (index, id) => {
        axios.delete(`/api/clients/${props.client.id}/invoices/${id}`)
            .then((res) => res)
            .then((json) => {
                if (json.status === 200) {
                    let newInvoices = [...props.invoices];
                    newInvoices.splice(index, 1);
                    
                    props.updateInvoices(newInvoices);
                }
            })
            .catch((err) => console.log(err))
    }

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
                                                {props.withClientName && <th>Client</th>}
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Sessions</th>
                                                <th>Amount Billed</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {console.log(props.invoices)}
                                            {props.invoices.map((invoice, index) => (
                                                <tr key={index} data-invoice_id={invoice.id}>
                                                    <td>
                                                        {/* todo status */}
                                                        {invoice.date_sent ? (
                                                            <span className="bg-success px-2 py-1 rounded-pill text-white">
                                                                <FaCheckCircle className="mr-1" />
                                                                Billed {invoice.date_sent}
                                                            </span>
                                                        ) : (
                                                            <span className="bg-danger px-2 py-1 rounded-pill text-white">
                                                                <FaExclamationCircle className="mr-1" />
                                                                Unbilled
                                                            </span>
                                                        )}
                                                    </td>
                                                    {props.withClientName && <td>{invoice.client_name}</td>}
                                                    <td>{invoice.invoice_name}</td>
                                                    <td>{invoice.invoice_details}</td>
                                                    <td>{invoice.invoice_line_items.length || 0}</td>
                                                    <td>{invoice.amount_billed || '$0'}</td>
                                                    <td className="position-relative">
                                                        <DropdownMenu 
                                                            items={[
                                                                {
                                                                    value: 'View',
                                                                    onClick: () => 
                                                                    props.client ? history.push(`/clients/${props.client.id}/invoices/${invoice.id}`)
                                                                    :
                                                                    history.push(`/invoicing/${invoice.id}`) // editInvoice(invoice.id)
                                                                },
                                                                {
                                                                    value: 'Update',
                                                                    onClick: () => console.log('click')
                                                                },
                                                                {
                                                                    value: 'Delete',
                                                                    onClick: () => deleteInvoice(index, invoice.id)
                                                                },
                                                            ]}
                                                        />
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

                                {/* TODO: indicate # of un-invoiced sessions */}
                            </CardBody>
                            <CardFooter>
                                <Button onClick={() => setAdding(true)}>
                                    Add Invoice
                                </Button>
                            </CardFooter>
                        </Card>
                        :
                        <AddInvoice setAdding={setAdding} agency={props.client.agency} client_id={props.client.id} invoices={props.invoices} updateInvoices={props.updateInvoices} />
                    }
                </Col>
            </Row>
        </div>

    )
}

export default Invoices;