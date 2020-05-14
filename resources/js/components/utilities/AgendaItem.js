import React from 'react';
import { Card } from 'reactstrap';
import { FaCalendar } from 'react-icons/fa';

const AgendaItem = (props) => {
    return (
        <Card className="p-4 mb-1">
            <div className="d-flex align-items-baseline">
                <FaCalendar />
                <h5 className="ml-2">{props.title}</h5>
            </div>
            <div className="d-flex p-2">
                <div className="flex-grow-1">
                    {props.date}
                </div>
                <div className="flex-grow-1">
                    {props.detail}
                </div>
            </div>
            <div className="d-flex flex-end text-primary">
                View
            </div>
        </Card>
    )
}

export default AgendaItem;