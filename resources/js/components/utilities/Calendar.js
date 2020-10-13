import React, { useState } from 'react';
import moment from 'moment';
import { dayAbbervs } from "../helpers/functions";

const Calendar = (props) => {
    console.log(props);

    const currentDate = moment();
    const selectedDate = moment(currentDate).format('MM/DD/YYYY');
    const startWeek = moment().startOf('month').week();
    const endWeek = moment().endOf('month').week();

    console.log(selectedDate);

    let calendar = []
    for (var week = startWeek; week < endWeek; week++) {
        calendar.push({
            week: week,
            days: Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
        })
    }

    console.log(calendar);

    return (
        <div>
            <div className="calendar-week calendar-week-header">
                {dayAbbervs.map((d, index) => <div key={index}>{d}</div>)}
            </div>
            {/* {Map through calendar weeks} */}
            {calendar.map((week) => (
                <div key={week.week} className="calendar-week">
                    {week.days.map((day, index) => (
                        <div key={index} className={selectedDate === day ? "calendar-current-date" : ""}>{moment(day).format('D').toString()}</div>
                    ))}
                </div>
            ))}
            <div>
                
            </div>
        </div>
    )
}

export default Calendar;