import React, { useState } from 'react';
import ClientInfo from './ClientInfo';
import { Row, Col, Card } from 'reactstrap';
import { FaCalendar } from 'react-icons/fa';
import AgendaItem from '../utilities/AgendaItem';

const ManageClient = (props) => {
    const [page, setPage] = useState(false);

    return (
        <div className="d-flex h-100 anti-row">
            <div style={{minWidth: 400}}>
                <ClientInfo client={props.client} />
            </div>
            <div className="flex-grow-1 d-flex p-4">
                <div className="flex-grow-1 px-1">
                    <Card>
                        Sessions
                    </Card>
                </div>
                <div className="flex-grow-1 px-1">
                    <AgendaItem 
                        title={"Next Session"}
                        date={"23| Sep, 2020"}
                        detail={"Therapy Session"}
                    />
                    <AgendaItem 
                        title={"Last Session"}
                        date={"16| Sep, 2020"}
                        detail={"Therapy Session"}
                    />
                </div>
            </div>
        </div>
    )
}

export default ManageClient;