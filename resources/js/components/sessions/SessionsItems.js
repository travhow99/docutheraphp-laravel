import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { getReadableDate, toLocalTime } from '../helpers/functions';
import CrudTable from '../utilities/CrudTable/CrudTable';

const SessionsItems = (props) => {
    console.log('sesh itesm props', props);
    const [sessions, setSessions] = useState(props.priorData || []);

    useEffect(() => {
        const fetchSessions = async() => {
            const url = props.client_id ? `/api/clients/${props.client_id}/sessions` : '/api/sessions';

            axios.get(url)
                .then((res) => {
                    const data = res.data.sessions ? res.data.sessions : res.data;
                    
                    setSessions(data)
                    props.setPriorData(data)
                })
                .catch((err) => console.log(err))
        }

        fetchSessions();
    }, [setSessions]);

    console.log('sesh:', sessions);

    const buildData = (items) => {
        const data = [];

        items.map((i) => {
            const row = {
                'data-client_id': i.client_id,
                'data-session_id': i.id,
                billed: i.billed,
                client: i.client_name,
                session_date: getReadableDate(i.session_date),
                session_time: toLocalTime(i.session_time),
            }

            data.push(row);
        })

        return data;
    }

    return (
        <Card>
            <CardBody>
                <CrudTable 
                    title="Sessions"
                    actions={[
                        {
                            type: 'view',
                            url: `/clients/$1/sessions/$2`,
                            action: 'link',
                            data: ['client_id', 'session_id'],
                        },
                    ]}
                    headers={[
                        {
                            title: 'Billed',
                            // width: '5%',
                        },
                        {
                            title: 'Client',
                        },
                        {
                            title: 'Session Date',
                        },
                        {
                            title: 'Session Time',
                        },
                    ]}
                    data={buildData(sessions)}
                />
            </CardBody>
        </Card>
    );
}

export default SessionsItems;