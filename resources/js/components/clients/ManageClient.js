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
            <div className="flex-grow-1 p-4 d-flex flex-column">
                <div className="flex-grow-1 flex-half d-flex">
                    <div className="d-flex flex-grow-1 px-1">
                        <Card className="flex-full mb-2">
                            Sessions
                        </Card>
                    </div>
                    <div className="d-flex flex-column flex-grow-1 px-1">
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
                <div className="flex-grow-1 flex-half d-flex">
                    <div className="flex-grow-1 px-1">
                        <Card className="flex-full h-100">
                            TEST
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageClient;