import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { getReadableDate, getSessionAttribute, toLocalTime } from '../helpers/functions';
import CrudTable from '../utilities/CrudTable/CrudTable';

const SessionItems = (props) => {
    console.log('sesh itesm props', props);
    const [sessions, setSessions] = useState(props.priorData || []);

    useEffect(() => {
        const fetchSessions = async() => {
            const url = props.client_id ? `/api/clients/${props.client_id}/sessions/completed` : '/api/sessions/completed';

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
        if (!items.length) items = [];
        const data = [];

        items.map((i) => {
            const row = {
                'data-client_id': i.client_id,
                'data-session_id': i.id,
                'data-invoice_id': props.invoice.id,
                'data-session_units': getSessionAttribute(i.session_attributes, 'session_units', '0'),
                'data-unit_cost': getSessionAttribute(i.session_attributes, 'unit_cost', '0'),
                billed: i.billed,
                client: i.client_name,
                session_date: getReadableDate(i.session_date),
                session_time: toLocalTime(i.session_time),
                session_units: getSessionAttribute(i.session_attributes, 'session_units', '0'),
                unit_cost: '$' + getSessionAttribute(i.session_attributes, 'unit_cost', '0'),
            }

            data.push(row);
        })

        return data;
    }

    const addLineItem = (id) => {
        // post to add line item to invoices
        console.log('add item', id);
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
                        /**
                         * @todo Add session to invoice action
                         */
                         {
                            type: 'add',
                            url: `/api/invoices/$1/invoiceLineItems`,
                            action: 'post',
                            data: ['invoice_id'],
                            post: ['session_id', 'session_units', 'unit_cost'],
                            text: 'Add session to this invoice?',
                            callback: addLineItem,
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
                        {
                            title: 'Units',
                        },
                        {
                            title: 'Cost',
                        },
                    ]}
                    data={buildData(sessions)}
                />
            </CardBody>
        </Card>
    );
}

export default SessionItems;