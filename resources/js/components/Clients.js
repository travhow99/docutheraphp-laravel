import React, { Component } from 'react'
import axios from 'axios'
import { 
    Container, Row, Col,
    Card, CardBody, CardTitle
} from 'reactstrap';

class Clients extends Component {
    constructor() {
        super()

        let AppState;
        let state = localStorage["appState"];
        if (state) {
          AppState = JSON.parse(state);
        }
    
        this.state = {
            isLoggedIn: AppState.isLoggedIn,
            user: AppState.user,
            clients: [],
        }
    }

    componentDidMount() {
        console.log(this.state);
        
        axios.get('/api/auth/user').then((response) => {
            console.log(response);
            return;
            this.setState({
                clients: response.data,
            })
            console.log(this.state);
        })
    }

    render() {
        // const { clients } = this.state.clients;

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