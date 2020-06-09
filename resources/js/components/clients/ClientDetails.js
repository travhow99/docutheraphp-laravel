import React from 'react';
import Pocs from '../pocs/Pocs';
import { 
    Row, Col,
    Card, CardBody, Button,
    Form, FormGroup, FormFeedback, Label
} from 'reactstrap';
import { days } from '../helpers/functions';

const ClientDetails = (props) => {
    return(
        <div className="client-container">
                <Row className="mb-4">
                    <Col>
                        <Card>
                            <CardBody>
                                <h5>Client details</h5>
                                <Form /* onSubmit={this.handleSubmit} */>
                                    <FormGroup>
                                        <Label for="session_day">Session Day</Label>
                                        <select 
                                            id="sessionDay" 
                                            name="session_day" 
                                            className={`form-control ${!props.client.session_time ? 'is-invalid' : ''}`}
                                            onChange={props.updateClient}
                                            defaultValue={props.client.session_day || 'default'}
                                        >
                                            <option defaultValue="default" disabled>Session Day</option>
                                            {days.map((day, i) => (
                                                <option defaultValue={day} key={i}
                                                >{day}</option>
                                            ))}
                                        </select>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="session_time">Session Time</Label>
                                        <input 
                                            id="session_time" 
                                            type="time" 
                                            name="session_time" 
                                            placeholder="Session Time" 
                                            className={`form-control ${!props.client.session_time ? 'is-invalid' : ''}`} 
                                            onBlur={props.updateClient} 
                                            defaultValue={props.client.session_time} 
                                            required 
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="start_date">Start Date</Label>
                                        <input 
                                            id="start_date" 
                                            type="date" 
                                            name="start_date" 
                                            placeholder="Start Date" 
                                            className={`form-control ${!props.client.start_date ? 'is-invalid' : ''}`} 
                                            onBlur={props.updateClient} 
                                            defaultValue={props.client.start_date} 
                                            required 
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="agency">Agency</Label>
                                        <input 
                                            id="agency" 
                                            type="text"
                                            ame="agency" 
                                            placeholder="Agency" 
                                            defaultValue={props.client.agency} 
                                            className={`form-control ${!props.client.agency ? 'is-invalid' : ''}`} 
                                            onBlur={props.updateClient} 
                                            required 
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="address">Address</Label>
                                        <input 
                                            id="address" 
                                            type="text" 
                                            name="address" 
                                            placeholder="Address" 
                                            defaultValue={props.client.address} 
                                            className={`form-control ${!props.client.address ? 'is-invalid' : ''}`} 
                                            onBlur={props.updateClient} 
                                            required 
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="diagnosis">Diagnosis</Label>
                                        <input 
                                            id="diagnosis" 
                                            type="text" 
                                            name="diagnosis" 
                                            placeholder="Diagnosis" 
                                            defaultValue={props.client.diagnosis} 
                                            className={`form-control ${!props.client.diagnosis ? 'is-invalid' : ''}`} 
                                            onBlur={props.updateClient} 
                                            required 
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="approach">Approach</Label>
                                        <input 
                                            id="approach" 
                                            type="text" 
                                            name="approach" 
                                            placeholder="Approach" 
                                            defaultValue={props.client.approach} 
                                            className={`form-control ${!props.client.approach ? 'is-invalid' : ''}`} 
                                            onBlur={props.updateClient} 
                                            required 
                                        />
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Pocs client_id={props.client.id} pocs={props.pocs} updatePocs={props.updatePocs} />
        </div>
    )
}

export default ClientDetails;