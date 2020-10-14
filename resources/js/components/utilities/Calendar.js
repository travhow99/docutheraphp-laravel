import React, { useState } from 'react';
import moment from 'moment';
import { dayAbbervs, getMonth } from "../helpers/functions";
import { Card, CardHeader } from 'reactstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Calendar = (props) => {
    console.log(props);

    const currentDate = moment();
    const selectedDate = moment(currentDate).format('MM/DD/YYYY');
    const startWeek = moment().startOf('month').week();
    const endWeek = moment().endOf('month').week();

    let calendar = []
    for (var week = startWeek; week < endWeek; week++) {
        calendar.push({
            week: week,
            days: Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
        })
    }

    const dayClassName = (date) => {
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

    const onClick = () => {
        console.log('clicky');
    }

    return (
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
                        <div key={index} className={dayClassName(day)}>
                            <div className="calendar-day" onClick={(() => props.onClick(day))}>
                                {moment(day).format('D').toString()}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div>

            </div>
        </Card>
    )
}

export default Calendar;