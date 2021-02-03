import React, { useState } from 'react';
import {
    Card, CardHeader, CardBody, Form, FormGroup, Input, Button, CardFooter, Table
} from "reactstrap";
import { FaTimes, FaCheck, FaTimesCircle, FaEye, FaTrash } from 'react-icons/fa';
import { useAlert } from 'react-alert';
import { confirmAlert } from 'react-confirm-alert'; // Import
import DropdownMenu from '../utilities/DropdownMenu';
import CrudTable from '../utilities/CrudTable/CrudTable';

const EditInvoice = (props) => {
    const [invoiceName, setInvoiceName] = useState(false);
    const [invoiceDescription, setInvoiceDescription] = useState(false);
    const [adding, setAdding] = useState(false)

    console.log(props.invoice);

    const alert = useAlert();

    const updateInvoice = (index, id, data) => {
        const { name, value } = data;

        /* axios.put(`/api/clients/${props.client_id}/invoices/${id}`, {
            [name]: value
        })
        .then((res) => res)
        .then((json) => {
            if (json.status === 200) {
                alert.show('Invoice updated!', {
                    timeout: 2000,
                    type: 'success',
                })

                let newPocs = [...props.pocs];
                newPocs[index] = {...newPocs[index], [name]: value};

                props.updatePocs(newPocs);
            }
        })
        .catch((err) => console.log(err)) */
    }

    const deleteLineItem = (index, id) => {
        console.log(index, id);

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`/api/invoices/${props.invoice.id}/invoiceLineItems/${id}`)
                            .then((res) => res)
                            .then((json) => {
                                if (json.status === 200) {
                                    let newLineItems = [...props.invoice.invoice_line_items];
                                    newLineItems.splice(index, 1);
                
                                    let updatedInvoice = props.invoice;
                                    updatedInvoice.invoice_line_items = newLineItems;
                                    
                                    const updatedInvoiceIndex = props.invoices.findIndex((i) => i.id === props.invoice.id);

                                    const updatedInvoices = [...props.invoices];

                                    updatedInvoices[updatedInvoiceIndex] = updatedInvoice;

                                    console.log('prev inv', props.invoices);
                                    console.log('updated inv', updatedInvoices);

                                    props.updateInvoices(updatedInvoices);
                                }
                            })
                            .catch((err) => console.log(err))
                    }
                },
                {
                    label: 'No',
                    // onClick: () => alert('Click No')
                }
            ]
        });
    }

    const calculateUnitPrice = (units, price) => {
        return units * price;
    }

    return (
        <React.Fragment>
            <Card className="mt-4">
                <CardHeader>
                    <FaTimes className="float-right c-pointer" onClick={() => props.editInvoice(false)} />
                </CardHeader>
                <CardBody>
                    <Form /* onSubmit={updateInvoice} */>
                        <FormGroup className="mb-2">
                            <Input
                                type="text"
                                name="invoice_name"
                                id="invoice_name"
                                placeholder="Invoice Name"
                                defaultValue={props.invoice.invoice_name}
                                onBlur={props.editInvoice}
                                required
                            />
                        </FormGroup>

                        <FormGroup className="mb-2">
                            <Input
                                type="textarea"
                                name="invoice_description"
                                id="invoice_description"
                                placeholder="Description"
                                defaultValue={props.invoice.invoice_details}
                                onBlur={props.editInvoice}
                            />
                        </FormGroup>

                        <Button type="submit" color="primary">Add</Button>

                    </Form>
                </CardBody>
            </Card>
            <Card className="mt-2">
                <CardBody>
                    <CrudTable
                        view = {() => updateInvoice(index, item.id)}
                        delete = {() => deleteLineItem(index, item.id)}
                        headers={[
                            {
                                title: '',
                                width: '5%',
                                key: 'complete',
                            },
                            {
                                title: 'Session Date',
                                key: 'session_date',
                            },
                            {
                                title: 'Units',
                                key: 'session_units',
                            },
                            {
                                title: 'Cost',
                                key: 'unit_cost',
                            },
                        ]}
                        keys={[
                            'complete',
                            'session_date',
                            'session_units',
                            'unit_cost',
                        ]}
                        items={props.invoice.invoice_line_items}
                    />

                    <Table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Session Date</th>
                                <th>Units</th>
                                <th>Cost</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.invoice.invoice_line_items && props.invoice.invoice_line_items.map((item, index) => (
                                <tr key={index}>
                                    <td width="5%">
                                        {item.session.complete ?
                                            <FaCheck className="text-success" />
                                            :
                                            <FaTimesCircle className="text-danger" />
                                        }
                                    </td>
                                    <td>{item.session.session_date}</td>
                                    <td>{item.session_units}</td>
                                    <td>${calculateUnitPrice(item.session_units, item.unit_cost)}</td>
                                    <td className="flex-end">
                                        <div>
                                            <Button className="mr-2" color="success" onClick={() => deleteLineItem(index, item.id)}>
                                                <FaEye />
                                            </Button>
                                            <Button color="danger" onClick={() => deleteLineItem(index, item.id)}>
                                                <FaTrash />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>

                <CardFooter>
                    <Button onClick={() => setAdding(true)}>
                        Add Session
                    </Button>
                </CardFooter>
            </Card>
        </React.Fragment>

    )
}

export default EditInvoice;