import React, { useState, useEffect } from 'react';
import ClientInfo from './ClientInfo';
import { Row, Col, Card } from 'reactstrap';
import { FaCalendar } from 'react-icons/fa';
import AgendaItem from '../utilities/AgendaItem';
import { useParams } from 'react-router-dom';

const ManageClient = (props) => {
    const params = useParams();
    const id = params.id;
    const [client, setClient] = useState(false);
    const [page, setPage] = useState(false);

    useEffect(() => {
        const fetchClient = async () => {
            const result = await axios(
                `/api/clients/${id}`,
            );

            setClient(result.data);
        }

        fetchClient();
      }, [id]);
    

    return (
        <React.Fragment>
            {client ? (
            <div className="d-flex h-100 anti-row">
                <div className="d-flex h-100" style={{minWidth: 280}}>
                    <ClientInfo client={client} />
                </div>
                <div className="flex-grow-1 p-4 mx-4 d-flex flex-column">
                    <div className="flex-grow-1 flex-half d-flex">
                        <div className="d-flex flex-grow-1 px-1">
                            <Card className="flex-full mb-2">
                                Sessions
                            </Card>
                        </div>
                        <div className="d-flex flex-column flex-grow-1 px-1">
                            <AgendaItem 
                                title={"Next Session"}
                                date={client.next_session}
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
            ) : (
                <div>Loading</div>
            )}
        </React.Fragment>
    )
}

export default ManageClient;