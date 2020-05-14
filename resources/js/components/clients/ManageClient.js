import React, { useState } from 'react';
import ClientInfo from './ClientInfo';
import { Row, Col, Card } from 'reactstrap';

const ManageClient = (props) => {
    const [page, setPage] = useState(false);

    return (
        <Row className="manage-row">
            <Col className="px-0">
                <ClientInfo client={props.client} />
            </Col>
            <Col sm={8}>
                <Row>
                    <Col>
                        <Card>
                            Sessions
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            Next session
                        </Card>
                        <Card>
                            Last session
                        </Card>

                    </Col>

                </Row>
            </Col>
        </Row>
    )
}

export default ManageClient;