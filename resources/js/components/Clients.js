import React, { Component } from 'react'
import axios from 'axios'
import { 
    Container, Row, Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button  
} from 'reactstrap';
import { Link } from 'react-router-dom'

class Clients extends Component {
    constructor() {
        super()
        this.state = {
            clients: [],
        }
    }

    componentDidMount() {
        axios.get('/api/clients').then((response) => {
            this.setState({
                clients: response.data,
            })
            console.log(this.state);
        })
    }

    render() {
        const { clients } = this.state.clients;

        return (
            <Container>
                <Row>
                    <Col md="8">
                        <Card>
                            <CardBody>
                                <CardTitle></CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Clients;