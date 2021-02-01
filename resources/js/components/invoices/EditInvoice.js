import React, { useState } from 'react';
import { 
    Card, CardHeader, CardBody, Form, FormGroup, Input, Button, CardFooter, Table
 } from "reactstrap";
import { FaTimes, FaCheck, FaTimesCircle } from 'react-icons/fa';
import { useAlert } from 'react-alert';
import DropdownMenu from '../utilities/DropdownMenu';

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

    const deleteLineItem = (index, id) => {
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
                    {props.invoice.invoice_line_items && props.invoice.invoice_line_items.map((item, index) => (
                        <Table key={index} hover>
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
                                <tr>
                                    <td>
                                        {item.session.complete ? 
                                            <FaCheck className="text-success" />
                                            :
                                            <FaTimesCircle className="text-danger" />
                                        }
                                    </td>
                                    <td>{item.session.session_date}</td>
                                    <td>{item.session_units}</td>
                                    <td>${calculateUnitPrice(item.session_units, item.unit_cost)}</td>
                                    <td className="position-relative">
                                        <DropdownMenu 
                                            items={[
                                                {
                                                    value: 'View',
                                                    onClick: () => props.editInvoice(invoice.id)
                                                },
                                                {
                                                    value: 'Remove',
                                                    onClick: () => deleteLineItem(index, invoice.id)
                                                },
                                            ]}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
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