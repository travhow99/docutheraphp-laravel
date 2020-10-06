import React from 'react';
import { Card, Button } from 'reactstrap';
import AgendaItem from '../utilities/AgendaItem';
import ListItem from "../utilities/ListItem";
import Doughnut from '../charts/Doughnut';
import { Link } from 'react-router-dom';

const ClientOverview = (props) => {
    console.log(props.client);
    return (
        <div className="client-container">
            <div className="flex-1 flex-half d-flex">
                <div className="d-flex flex-half px-1">
                    <Card className="mb-2 w-100">
                        <div className="p-4 flex-full d-flex flex-column">
                            <div>
                                <h5>Goal Areas</h5>
                            </div>
                            {props.goals.length ?
                                (
                                    <div className="d-flex flex-column flex-1 px-1">
                                        {props.goals.slice(0, 3).map((goal) => ( // Limited count
                                            <ListItem key={goal.id} goal={goal} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column flex-1 px-1">
                                        <div>
                                            No goals for this client yet!&nbsp;
                                            <Link to={`/clients/${props.client.id}/goals`}>Add one</Link>?
                                        </div>
                                    </div>
                                )
                            }
                            <div className="d-flex flex-end">
                                <Link to={`/clients/${props.client.id}/goals`}>View Goals</Link>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="d-flex flex-column flex-half px-1">
                    <AgendaItem
                        title={"Next Session"}
                        date={props.client.next_session.session_date}
                        time={props.client.session_time}
                        detail={"Therapy Session"}
                        // TODO: determine if session exists already
                        href={`/clients/${props.client.id}/sessions/${props.client.next_session.session_id || 'new'}`}
                    />
                    <AgendaItem
                        title={"Last Session"}
                        date={props.client.last_session.session_date}
                        time={props.client.last_session.session_time}
                        detail={"Therapy Session"}
                        href={`/clients/${props.client.id}/sessions/${props.client.last_session.id}`}
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
                                    The chart below will update depending on the results of your sessions.
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
    )
}

export default ClientOverview;