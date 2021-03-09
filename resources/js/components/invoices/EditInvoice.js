import React, { useState } from 'react';
import {
    Card, CardHeader, CardBody, Form, FormGroup, Input, Button, CardFooter, Table
} from "reactstrap";
import { FaTimes, FaCheck, FaTimesCircle, FaEye, FaTrash } from 'react-icons/fa';
import { useAlert } from 'react-alert';
import { confirmAlert } from 'react-confirm-alert'; // Import
import DropdownMenu from '../utilities/DropdownMenu';
import CrudTable from '../utilities/CrudTable/CrudTable';
import { getReadableDate } from '../helpers/functions';

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

    const viewLineItem = (index, id) => {
        console.log(index, id);


    }

    const deleteLineItem = (index, id) => {
        console.log(index, id);

        return;

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

    const generateColor = (status) => {
        let ret;

        switch (status) {
            case 'complete':
                ret = <FaCheck className="text-success" />;                
                break;
            default:
                ret = <FaTimesCircle className="text-danger" />
                break;
        }

        return ret;
    }

    const buildData = (items) => {
        console.log(items);
        const data = [];

        items.map((i) => {
            const row = {
                status: generateColor('complete'),
                'data-client_id': i.session.client_id,
                'data-session_id': i.session_id,
                'data-invoice_id': i.invoice_id,
                'data-invoice_line_item_id': i.id,
                session_date: getReadableDate(i.session.session_date),
                session_units: i.session_units,
                unit_cost: '$' + (i.session_units * i.unit_cost),
            }

            data.push(row);
        })

        return data;
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
                        actions={[
                            {
                                type: 'view',
                                url: `/clients/$1/sessions/$2`,
                                action: 'link',
                                data: ['client_id', 'session_id'],
                            },
                            {
                                type: 'delete',
                                url: `/api/invoices/$1/invoiceLineItems/$2`,
                                action: 'delete',
                                data: ['invoice_id', 'invoice_line_item_id'],
                                update: props.updateInvoices,
                            },
                        ]}
                        headers={[
                            {
                                title: '',
                                width: '5%',
                            },
                            {
                                title: 'Session Date',
                            },
                            {
                                title: 'Units',
                            },
                            {
                                title: 'Cost',
                            },
                        ]}
                        data={buildData(props.invoice.invoice_line_items)}
                    />
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