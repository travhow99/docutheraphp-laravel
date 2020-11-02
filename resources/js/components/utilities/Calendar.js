import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { dayAbbervs, getMonth, toLocalTime } from "../helpers/functions";
import { Card, CardHeader } from 'reactstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Calendar = (props) => {
    const currentDate = moment();

    // const selectedDate = moment(currentDate).format('MM/DD/YYYY');
    const defaultDate = props.date ? props.date.format('YYYY-MM-DD') : moment(currentDate).format('YYYY-MM-DD');

    const [selectedDate, setDate] = useState(defaultDate);
    
    const dateSessions = props.data[selectedDate];
    const startWeek = moment(selectedDate).startOf('month').week();
    const endWeek = moment(selectedDate).month() != 11 ? moment(selectedDate).endOf('month').week() : 53;

    let calendar = []
    for (var week = startWeek; week <= endWeek; week++) {
        calendar.push({
            week: week,
            days: Array(7).fill(0).map((n, i) => moment(selectedDate).week(week).startOf('week').clone().add(n + i, 'day'))
        })
    }

    const dateClassName = (date) => {
        let className = 'calendar-day-container';

        if (!moment(selectedDate).isSame(currentDate, 'month')) {
            if (moment(selectedDate).isSame(date, 'month')) {
                return className += ' calendar-future-date';
            } else {
                return className += ' calendar-previous-date';
            }
        } else {
            if (!moment(selectedDate).isSame(date, 'month')) {
                return className += ' calendar-previous-date';
            }

            if (moment(currentDate).isSame(date, 'day')) {
                className += ' calendar-current-date';
            } else if (moment(currentDate).isBefore(date, 'day')) {
                className += ' calendar-future-date';
            } else if (moment(currentDate).isAfter(date, 'day')) {
                className += ' calendar-previous-date';
            }
    
            return className;
        }
    }

    /**
     * Build day class name based on data number.
     * @param {date} date 
     */
    const dayClassName = (date) => {
        const search = date.format('YYYY-MM-DD');
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

        if (search === selectedDate) {
            className += ' selected-date';
        }
        
        return className;
    }

    return (
        <React.Fragment>
            <Card className="calendar">
                <div className="calendar-header">
                    <div className="calendar-month-btn" onClick={(()=>{
                        const lastMonth = moment(selectedDate).subtract(1, 'month').format('YYYY-MM-DD');
                        props.monthChange(lastMonth);
                        setDate(lastMonth);
                    })}>
                        <FaAngleLeft />
                    </div>
                    <div className="calendar-header-month">
                        {getMonth(moment(selectedDate).month())}
                    </div>
                    <div className="calendar-month-btn" onClick={(()=>{
                        const nextMonth = moment(selectedDate).add(1, 'month').format('YYYY-MM-DD');
                        props.monthChange(nextMonth);
                        setDate(nextMonth);
                    })}>
                        <FaAngleRight />
                    </div>
                </div>
                <div className="calendar-btn-container">
                    <div className="calendar-today-btn" onClick={(()=>{
                        moment(currentDate).isSame(selectedDate, 'month') ?
                            setDate(moment().format('YYYY-MM-DD'))
                        :
                            props.monthChange(moment().format('YYYY-MM-DD'))
                            setDate(moment().format('YYYY-MM-DD'))
                        })}
                    >
                        Today
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