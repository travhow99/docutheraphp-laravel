import React, { useState } from 'react';
import { 
    Card, CardHeader, CardBody, Form, FormGroup, Input, Button
 } from "reactstrap";
 import { FaTimes } from 'react-icons/fa';
import { useAlert } from 'react-alert';

const EditInvoice = (props) => {
    const [invoiceName, setInvoiceName] = useState(false);
    const [invoiceDescription, setInvoiceDescription] = useState(false);

    console.log(invoiceName, invoiceDescription);
    const alert = useAlert();

    const updateInvoice = (e) => {
        e.preventDefault();

        axios.post(`/api/clients/${props.client_id}/invoices`, {
            invoice_name: invoiceName,
            invoice_details: invoiceDescription,
            agency: props.agency,
        })
        .then((res) => res)
        .then((json) => {
            if (json.status === 200) {
                console.log(json.data);
                console.log([...props.invoices, json.data]);
                props.updateInvoices([...props.invoices, json.data])

                props.setAdding(false);
                // setContactName(false);
                // setEmail(false);
                // setPhoneNumber(false);

                alert.show('Invoice updated!', {
                    timeout: 2000, // custom timeout just for this one alert
                    type: 'success',
                })
            }
        });
    }

    const updateContact = (index, id, data) => {
        const {name, value} = data;

        axios.put(`/api/clients/${props.client_id}/invoices/${id}`, {
            [name]: value
        })
        .then((res) => res)
        .then((json) => {
            if (json.status === 200) {
                alert.show('Contact updated!', {
                    timeout: 2000,
                    type: 'success',
                })

                let newPocs = [...props.pocs];
                newPocs[index] = {...newPocs[index], [name]: value};

                props.updatePocs(newPocs);
            }
        })
        .catch((err) => console.log(err))
    }

    const deleteContact = (index, id) => {
        axios.delete(`/api/clients/${props.client_id}/invoices/${id}`)
            .then((res) => res)
            .then((json) => {
                if (json.status === 200) {
                    let newPocs = [...props.pocs];
                    newPocs.splice(index, 1);
                    
                    props.updatePocs(newPocs);
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <Card>
            <CardHeader>
                New Invoice
                <FaTimes className="float-right c-pointer" onClick={() => props.setEditing(false)} />
            </CardHeader>
            <CardBody>
                <Form /* onSubmit={updateInvoice} */>
                    <FormGroup className="mb-2">
                        <Input
                            type="text"
                            name="invoice_name"
                            id="invoice_name"
                            placeholder="Invoice Name"
                            onBlur={props.updateInvoice}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mb-2">
                        <Input
                            type="textarea"
                            name="invoice_description"
                            id="invoice_description"
                            placeholder="Description"
                            onBlur={props.updateInvoice}
                        />
                    </FormGroup>

                    <Button type="submit" color="primary">Add</Button>

                </Form>
            </CardBody>
        </Card>
    )
}

export default EditInvoice;