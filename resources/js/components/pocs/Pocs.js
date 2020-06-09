import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Table, Form, FormGroup, Input, Button } from 'reactstrap';
import { FaTimes } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useAlert } from 'react-alert';
import ContactRow from './ContactRow';

const Pocs = (props) => {
    const [adding, setAdding] = useState(false);
    const [contactName, setContactName] = useState(false);
    const [email, setEmail] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(false);

    const alert = useAlert();

    const addContact = (e) => {
        e.preventDefault();

        axios.post(`/api/clients/${props.client_id}/pocs`, {
            contact_name: contactName,
            email: email,
            phone_number: phoneNumber,
        })
        .then((res) => res)
        .then((json) => {
            if (json.status === 201) {
                props.updatePocs([...props.pocs, json.data])

                setAdding(false);
                setContactName(false);
                setEmail(false);
                setPhoneNumber(false);

                alert.show('Contact created!', {
                    timeout: 2000, // custom timeout just for this one alert
                    type: 'success',
                })
            }
        });
    }

    const updateContact = (index, id, data) => {
        const {name, value} = data;

        axios.put(`/api/clients/${props.client_id}/pocs/${id}`, {
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

                console.log('NEW NEW',newPocs);
                props.updatePocs(newPocs);
            }
        })
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
                        <CardHeader>
                            New Contact
                            <FaTimes className="float-right c-pointer" onClick={() => setAdding(false)} />
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
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(props.pocs)}
                                        {props.pocs.map((poc, index) => (
                                            <ContactRow key={index} index={index} poc={poc} updateContact={updateContact} />
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