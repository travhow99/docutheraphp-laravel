import React from 'react';
import { Card } from 'reactstrap';
import { FaCalendar } from 'react-icons/fa';
import { getDayAbbrev, getMonthAbbrev, toLocalTime } from '../helpers/functions';

const FormatDate = (props) => {
    // "05-19-2020" || "2020-05-15"
    const date = new Date(props.date);
    const month = getMonthAbbrev(date.getMonth());

    return (
        <div className="d-flex align-items-center">
            <div className="p-2 border-right border-2 border-indigo">
                <div style={{fontSize: '1.5rem',}}>{getDayAbbrev(date.getDay())}</div>
            </div>
            <div className="d-flex flex-column p-2">
                <div style={{fontWeight: 'bolder', fontSize: '1rem'}}>
                    {month} {date.getDate()}, {date.getFullYear()}
                </div>
                <div>
                    {props.time && toLocalTime(props.time)}
                </div>
            </div>
        </div>
    );
}

const AgendaItem = (props) => {
    return (
        <Card className="p-4 mb-2 flex-grow-1">
            <div className="d-flex align-items-baseline">
                <FaCalendar />
                <h5 className="ml-2">{props.title}</h5>
            </div>
            <div className="flex-grow-1 align-items-center d-flex p-2">
                <div className="flex-grow-1">
                    <FormatDate date={props.date} time={props.time} />
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