import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Table, Form, FormGroup, Input, Button } from 'reactstrap';
import { FaTimes } from 'react-icons/fa';

const Pocs = (props) => {
    const [adding, setAdding] = useState(false);
    const [contactName, setContactName] = useState(false);
    const [email, setEmail] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(false);

    const addContact = (e) => {
        e.preventDefault();
        
        axios.post(`/api/clients/${props.client_id}/pocs`, {
            contact_name: contactName,
            email: email,
            phone_number: phoneNumber,
        })
        .then((res) => res)
        .then((json) => {
            if (json.status === 200) {
                console.log(json);
            }
        });
    }

    return (
        <React.Fragment>
        <Row className="justify-content-end mb-2">
            {!adding ? 
                <Col sm="3" className="text-right text-main c-pointer">
                    <span onClick={() => setAdding(true)}>
                        + ADD CONTACT
                    </span>
                </Col>
                :
                <Col>
                    <Card>
                        <CardHeader className="text-right">
                            <FaTimes className="c-pointer" onClick={() => setAdding(false)} />
                        </CardHeader>
                        <CardBody>
                            <Form inline onSubmit={addContact}>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Input 
                                        type="text" 
                                        name="contact_name" 
                                        id="contact_name" 
                                        placeholder="Contact Name"
                                        onChange={e => setContactName(e.target.value)} 
                                        required
                                    />
                                </FormGroup>

                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        placeholder="Email"
                                        onChange={e => setEmail(e.target.value)} 
                                    />
                                </FormGroup>

                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Input 
                                        type="tel" 
                                        name="phone_number" 
                                        id="phone_number" 
                                        placeholder="Phone Number"
                                        onChange={e => setPhoneNumber(e.target.value)} 
                                    />
                                </FormGroup>

                                <Button type="submit" color="primary">Add</Button>

                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            }
        </Row>
        {props.pocs.length >= 1 &&
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <h5>Contacts</h5>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.pocs.map((poc) => (
                                            <tr>
                                                <td>{poc.contact_name}</td>
                                                <td>{poc.email}</td>
                                                <td>{poc.phone_number}</td>
                                                <td>{poc.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        }
        </React.Fragment>
    )
}

export default Pocs;