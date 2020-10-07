import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { 
    Container, Row, Col,
    Card, CardBody, CardTitle, CardFooter, Button
} from 'reactstrap';
import AddClient from './AddClient';
import EditClient from './EditClient';

class Clients extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);

        let AppState;
        let state = localStorage["appState"];
        if (state) {
          AppState = JSON.parse(state);
        }
    
        this.state = {
            isLoggedIn: AppState.isLoggedIn || false,
            user: AppState.user || {},
            clients: [],
            currentClient: null,
        }
        
        console.log(this.state);

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {        
        axios.get('/api/clients').then((response) => {
            this.setState({
                clients: response.data,
            })
            console.log(this.state);
        })
        console.log('CLIENTS STATE', this.state);
    }

    manageClient(e, index) {
        this.setState({
            currentClient: this.state.clients[index],
        });

        this.props.history.push('/clients');

        console.log(this.props);
    }

    handleDelete(e, id) {
        // TODO: discontinue, don't delete client...
        return;

        axios.delete(`/api/clients/${id}`).then((response) => {
            console.log(response);

            let clients = this.state.clients;
            clients = clients.map((client) => {
                return client.id === id;
            });

            console.log(clients);

            this.setState({
                clients,
            });
        })
    }

    return() {
        this.setState({
            currentClient: null,
        });
        axios.get('/api/clients').then((response) => {
            this.setState({
                clients: response.data,
            })
            console.log(this.state);
        })
    }

    setManage(e, index) {
        console.log(this.state.clients[index]);

        this.setState({
            manage: this.state.clients[index],
        });
    }

    render() {
        const clients = this.state.clients;
        console.log(clients);

        return (
            <React.Fragment>
                    <Row className="mt-4">
                        {!this.state.currentClient ? 
                        clients.map((client) => (
                            <Col md="6" key={client.id}>
                                <Card className="mb-3">
                                    <CardBody>
                                        <CardTitle className="text-center">
                                            <h3>{client.name}</h3>
                                        </CardTitle>
                                        <div>
                                            <ul style={{listStyleType: 'none',}}>
                                                <li>
                                                    Session Day: <strong>{client.session_day}</strong>
                                                </li>
                                                <li>
                                                    Session Time: <strong>{client.session_time}</strong>
                                                </li>
                                                <li>
                                                    Next Session: <strong>{client.next_session.session_date}</strong>
                                                </li>
                                            </ul>
                                        </div>
                                    </CardBody>
                                    <CardFooter>
                                        <Row>
                                            <Col>
                                                <Link to={
                                                    (client.session_time && client.session_day && client.start_date) ?
                                                    `/clients/${client.id}` :
                                                    `/clients/${client.id}/details`
                                                    } 
                                                    style={{textDecoration: 'none'}}>
                                                    <Button color="success" block>
                                                        Manage
                                                    </Button>
                                                </Link>
                                            </Col>
                                            <Col>
                                                <Button color="danger" block onClick={(e) => this.handleDelete(e, client.id)}>
                                                    Discontinue
                                                </Button>
                                            </Col>
                                        </Row>
                                        {(client.session_time && client.session_day && client.start_date) ? 
                                            <Row>
                                                <Col className="mt-2">
                                                    <Link to={`/clients/${client.id}/sessions`} style={{ textDecoration: 'none' }}>
                                                        <Button color="primary" block>
                                                            Sessions
                                                        </Button>
                                                    </Link>
                                                </Col>
                                            </Row>
                                            :
                                            <Row>
                                                <Col className="mt-2">
                                                    <Link to={`/clients/${client.id}/details`} style={{ textDecoration: 'none' }}>
                                                        <Button color="danger" outline block>
                                                            Setup Session Time
                                                        </Button>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        }
                                    </CardFooter>
                                </Card>
                            </Col>
                        )
                        ) : (
                            <React.Fragment>
                                <Button onClick={() => {this.setState({currentClient: null})}}>Back</Button>
                                <EditClient return={this.return.bind(this)} client={this.state.currentClient} />
                            </React.Fragment>
                        )
                    }
                    {!this.state.currentClient && <AddClient return={this.return.bind(this)} />}
                    </Row>
            </React.Fragment>
        )
    }
}

export default Clients;