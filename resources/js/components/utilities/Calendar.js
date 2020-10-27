import React, { useState } from 'react';
import moment from 'moment';
import { dayAbbervs, getMonth, toLocalTime } from "../helpers/functions";
import { Card, CardHeader } from 'reactstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Calendar = (props) => {
    console.log(props.data);

    const currentDate = moment();
    // const selectedDate = moment(currentDate).format('MM/DD/YYYY');
    const startWeek = moment().startOf('month').week();
    const endWeek = moment().endOf('month').week();

    const [selectedDate, setDate] = useState(moment(currentDate).format('YYYY-MM-DD'));
    const dateSessions = props.data[selectedDate];

    console.log('date:', selectedDate);

    let calendar = []
    for (var week = startWeek; week <= endWeek; week++) {
        calendar.push({
            week: week,
            days: Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
        })
    }

    const dateClassName = (date) => {
        let className = 'calendar-day-container';

        if (moment(currentDate).isSame(date, 'day')) {
            className += ' calendar-current-date';
        } else if (moment(currentDate).isBefore(date, 'day')) {
            className += ' calendar-future-date';
        } else if (moment(currentDate).isAfter(date, 'day')) {
            className += ' calendar-previous-date';
        }

        return className;
    }

    /**
     * Build day class name based on data number.
     * @param {date} date 
     */
    const dayClassName = (date) => {
        const search = date.format('YYYY-MM-D');
        const count = props.data[search] ? props.data[search].length : 0;
        let className = "calendar-day";

        switch (count) {
            case 0:
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                className += ` count-${count}`;
                break;
            default:
                className += ` count-max`;
                break;
        }
        
        return className;
    }

    return (
        <React.Fragment>
            <Card className="calendar">
                <div className="calendar-header">
                    <div>
                        <FaAngleLeft />
                    </div>
                    <div className="calendar-header-month">
                        {getMonth(currentDate.month())}
                    </div>
                    <div>
                        <FaAngleRight />
                    </div>
                </div>
                <div className="calendar-week calendar-week-header">
                    {dayAbbervs.map((d, index) => <div key={index}>{d}</div>)}
                </div>
                {/* {Map through calendar weeks} */}
                {calendar.map((week) => (
                    <div key={week.week} className="calendar-week">
                        {week.days.map((day, index) => (
                            <div key={index} className={dateClassName(day)}>
                                <div className={dayClassName(day)} onClick={(() => setDate(day.format('YYYY-MM-DD')))}>
                                    {moment(day).format('D').toString()}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </Card>
            <Card className="mt-2 p-2">
                {dateSessions ? (
                    dateSessions.map((session, index) => (
                        <div key={index}>
                            <h4>{session.client_name}</h4>
                            <p>{toLocalTime(session.session_time)}</p>
                        </div>
                    ))
                ) : (
                    <div>
                        No sessions
                    </div>
                )}
            </Card>
        </React.Fragment>
    )
}

export default Calendar;