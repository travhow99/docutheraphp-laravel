import React from 'react';
import moment from 'moment';
import { Card } from 'reactstrap';
import { FaCalendar } from 'react-icons/fa';
import { getDayAbbrev, getMonthAbbrev, toLocalTime } from '../helpers/functions';
import { Link } from 'react-router-dom';

const FormatDate = (props) => {
    // "05-19-2020" || "2020-05-15"
    const date = moment(props.date);
    const month = getMonthAbbrev(date.get('month'));

    return (
        <div className="d-flex align-items-center">
            <div className="p-2 border-right border-2 border-indigo">
                <div style={{fontSize: '1.5rem',}}>{getDayAbbrev(date.get('day'))}</div>
            </div>
            <div className="d-flex flex-column p-2">
                <div style={{fontWeight: 'bolder', fontSize: '1rem'}}>
                    {month} {date.get('date')}, {date.get('year')}
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
        <Card className="p-4 mb-2 flex-1">
            <div className="d-flex align-items-baseline">
                <FaCalendar />
                <h5 className="ml-2">{props.title}</h5>
            </div>
            {(props.date && props.time) ?     
                <React.Fragment>
                    <div className="flex-1 align-items-center d-flex p-2">
                        <div className="flex-1">
                            <FormatDate date={props.date} time={props.time} />
                        </div>
                        <div className="flex-1">
                            {props.detail}
                        </div>
                    </div>
                    <div className="d-flex flex-end text-primary">
                        <Link to={props.href}>
                            View
                        </Link>
                    </div>
                </React.Fragment>
                :
                <div>
                    Not Available
                </div>
            }
        </Card>
    )
}

export default AgendaItem;