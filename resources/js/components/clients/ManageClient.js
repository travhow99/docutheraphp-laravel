import React, { useState, useEffect } from 'react';
import ClientInfo from './ClientInfo';
import { Card, Button } from 'reactstrap';
import AgendaItem from '../utilities/AgendaItem';
import ListItem from "../utilities/ListItem";
import Doughnut from '../charts/Doughnut';
import { Link, useParams } from 'react-router-dom';

const ManageClient = (props) => {
    const params = useParams();
    const id = params.id;
    const [client, setClient] = useState(false);
    const [goals, setGoals] = useState(false);
    const [poc, setPoc] = useState(false);
    const [page, setPage] = useState(false);

    useEffect(() => {
        const fetchClient = async () => {

            axios.all([
                axios.get(`/api/clients/${id}`),
                axios.get(`/api/clients/${id}/goals`),
                axios.get(`/api/clients/${id}/pocs`),
            ])
            .then(axios.spread((clientDataRes, goalDataRes, pocDataRes) => {
                setClient(goalDataRes.data.client);
                setGoals(goalDataRes.data.goals);
                setPoc(pocDataRes.data);
            }))
            .catch((err) => console.log(err))
        }

    fetchClient();
    }, [id]);
    

    return (
        <React.Fragment>
            {console.log('POC', poc)}
            {client ? (
            <div className="d-flex h-100 anti-container">
                <div className="d-flex h-100 client-sidebar">
                    <ClientInfo client={client} poc={poc} />
                </div>
                <div className="flex-1 p-4 d-flex flex-column">
                    <div className="flex-1 flex-half d-flex">
                        <div className="d-flex flex-half px-1">
                            <Card className="mb-2 w-100">
                                <div className="p-4 flex-full d-flex flex-column">
                                    <div>
                                        <h5>Goal Areas</h5>
                                    </div>
                                    {goals.length ? 
                                        (
                                            <div className="d-flex flex-column flex-1 px-1">
                                                {goals.slice(0, 3).map((goal) => ( // Limited count
                                                    <ListItem key={goal.id} goal={goal} />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="d-flex flex-column flex-1 px-1">
                                                <div>
                                                    No goals for this client yet!&nbsp;
                                                    <Link to={`/clients/${client.id}/goals`}>
                                                        Add one
                                                    </Link>
                                                    ?
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className="d-flex flex-end">
                                        <Link to={`/clients/${client.id}/goals`}>View Goals</Link>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="d-flex flex-column flex-half px-1">
                            <AgendaItem 
                                title={"Next Session"}
                                date={client.next_session}
                                time={client.session_time}
                                detail={"Therapy Session"}
                                // TODO: determine if session exists already
                                href={`/clients/${client.id}/sessions/new`} 
                            />
                            <AgendaItem 
                                title={"Last Session"}
                                date={client.last_session.session_date}
                                time={client.last_session.session_time}
                                detail={"Therapy Session"}
                                href={`/clients/${client.id}/sessions/${client.last_session.id}`}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex-half d-flex">
                        <div className="flex-1 px-1">
                            <Card className="flex-full h-100">
                                <div className="p-4 flex-full d-flex flex-column">
                                    <div>
                                        <h5>Sessions</h5>
                                        <p className="lead">
                                            This is a fake graph demonstrating how your client is progressing.
                                        </p>
                                    </div>
                                    <div>
                                        <Doughnut />
                                    </div>
                                </div>
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