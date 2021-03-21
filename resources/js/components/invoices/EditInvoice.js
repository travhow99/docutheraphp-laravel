import React, { useEffect, useState } from 'react';
import {
    Card, CardHeader, CardBody, Form, FormGroup, Input, Button, CardFooter, Table
} from "reactstrap";
import { FaTimes, FaCheck, FaTimesCircle, FaEye, FaTrash } from 'react-icons/fa';
import { useAlert } from 'react-alert';
import CrudTable from '../utilities/CrudTable/CrudTable';
import { getReadableDate, to2digits } from '../helpers/functions';
import { useParams } from 'react-router';
import axios from 'axios';
import SessionItems from '../sessions/SessionItems';

const EditInvoice = (props) => {
    const params = useParams();
    const client_id = params.id || null;
    const invoice_id = params.invoice_id;

    const [invoice, setInvoice] = useState(null)
    const [invoiceName, setInvoiceName] = useState(false);
    const [invoiceDescription, setInvoiceDescription] = useState(false);
    const [adding, setAdding] = useState(false)
    const [priorData, setPriorData] = useState([])

    useEffect(() => {
        const fetchInvoice = async () => {
            axios.get(`/api/invoices/${invoice_id}`)
                .then((res) => setInvoice(res.data))
                .catch((err) => console.log(err))
        }

        fetchInvoice();
    }, [invoice_id, setInvoice]);

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
        if (!items.length) items = [];
        console.log('i line items:', items);

        const data = [];

        items.map((i) => {
            const row = {
                status: generateColor('complete'),
                'data-client_id': i.session.client_id,
                'data-session_id': i.session.id,
                'data-invoice_id': i.invoice_id,
                'data-invoice_line_item_id': i.id,
                session_date: getReadableDate(i.session.session_date),
                session_units: i.session_units,
                unit_cost: '$' + to2digits(i.session_units * i.unit_cost),
            }

            data.push(row);
        })

        return data;
    }

    const updateLineItems = () => {
        let result = [];

        props.updateInvoices(result);
    }

    const deleteLineItem = (id) => {
        let newLineItems = [...invoice.invoice_line_items];
        const index = newLineItems.findIndex((i) => i.id === id);
        newLineItems.splice(index, 1);

        let updatedInvoice = { ...invoice };
        updatedInvoice.invoice_line_items = newLineItems;

        console.log('updated invoice', updatedInvoice);

        // If has props.invoices passed from ManageInvoices.js
        if (props.invoices) {
            const updatedInvoiceIndex = props.invoices.findIndex((i) => i.id === invoice.id);

            const updatedInvoices = [...props.invoices];

            updatedInvoices[updatedInvoiceIndex] = updatedInvoice;
            
            console.log(updatedInvoices, updatedInvoiceIndex);

            props.updateInvoices(updatedInvoices);

            setInvoice(updatedInvoice);
        } else {
            setInvoice(updatedInvoice);
        }
    }

    console.log(props);

    return (
        <div className="client-container">
            {invoice ?
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
                                        defaultValue={invoice.invoice_name}
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
                                        defaultValue={invoice.invoice_details}
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
                                title="Invoice Items"
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
                                        callback: deleteLineItem,
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
                                data={buildData(invoice.invoice_line_items)}
                            />
                        </CardBody>

                        <CardFooter>
                            <Button onClick={() => setAdding(!adding)}>
                                {!adding ? 'Add Session' : 'Close'}
                            </Button>
                        </CardFooter>
                    </Card>
                    {adding && 
                        <SessionItems
                            client_id={client_id}
                            buttonLabel={'Save'}
                            priorData={priorData}
                            invoice={invoice}
                            updateInvoice={setInvoice}
                            setPriorData={setPriorData}
                        />
                    }
                </React.Fragment>
                :
                <div>
                    Loading...
                </div>
            }
        </div>

    )
}

export default EditInvoice;