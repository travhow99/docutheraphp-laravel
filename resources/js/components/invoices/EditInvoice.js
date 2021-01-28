import React, { useState } from 'react';
import { 
    Card, CardHeader, CardBody, Form, FormGroup, Input, Button, CardFooter
 } from "reactstrap";
 import { FaTimes } from 'react-icons/fa';
import { useAlert } from 'react-alert';

const EditInvoice = (props) => {
    const [invoiceName, setInvoiceName] = useState(false);
    const [invoiceDescription, setInvoiceDescription] = useState(false);
    const [adding, setAdding] = useState(false)

    console.log(props.invoice);

    const alert = useAlert();

    const updateInvoice = (index, id, data) => {
        const {name, value} = data;

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

    const deleteInvoice = (index, id) => {
        /* axios.delete(`/api/clients/${props.client_id}/invoices/${id}`)
            .then((res) => res)
            .then((json) => {
                if (json.status === 200) {
                    let newPocs = [...props.pocs];
                    newPocs.splice(index, 1);
                    
                    props.updatePocs(newPocs);
                }
            })
            .catch((err) => console.log(err)) */
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader>
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
                                onBlur={props.editInvoice}
                            />
                        </FormGroup>

                        <Button type="submit" color="primary">Add</Button>

                    </Form>
                </CardBody>
            </Card>
            <Card className="mt-2">
                <CardBody>
                    {props.invoice.invoice_line_items && props.invoice.invoice_line_items.map((item, index) => (
                        <div key={index}>
                            {item.session_units}
                        </div>
                    ))}
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