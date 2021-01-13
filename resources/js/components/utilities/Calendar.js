import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import moment from 'moment';
import { dayAbbervs, getMonth, toLocalTime } from "../helpers/functions";
import { Card, CardHeader } from 'reactstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Calendar = (props) => {
    const dt = DateTime.local();

    const [selectedDay, setSelectedDay] = useState(dt);

    console.log('current selected...', selectedDay, selectedDay.toISODate(), selectedDay.year)

    const dateSessions = props.data[selectedDay];

    let firstWeekInMonth = selectedDay.startOf('month').weekNumber;
    console.log(firstWeekInMonth);
    if (firstWeekInMonth === 53 || firstWeekInMonth === 52) firstWeekInMonth = 0;

    let lastWeekInMonth = selectedDay.endOf('month').weekNumber;
    console.log(lastWeekInMonth);

    if (lastWeekInMonth === 1) lastWeekInMonth = 53;
    
    let diff = lastWeekInMonth - firstWeekInMonth;
    let current = 0;
    let calendar = [];

    while (current <= diff) {
        let useWeek = selectedDay.startOf('month').plus({week: current}).startOf('week');

        calendar.push({
            week: current,
            days: Array(7).fill(0).map((n, i) => useWeek.set({ day: useWeek.day + i - 1})) 
        });

        if (useWeek.weekNumber === selectedDay.endOf('month').weekNumber && selectedDay.endOf('month').weekday === 7) diff++;

        current++;
    }

    console.log('CAL:', calendar)

    const dateClassName = (day) => {
        let className = 'calendar-day-container';

        console.log(day.toISODate(), selectedDay.toISODate())

        let useDate = selectedDay.hasSame(dt, 'month') && selectedDay.hasSame(dt, 'year')
                    ? dt
                    : selectedDay;

        let addition = day.hasSame(useDate, 'month') 
                        ? day.hasSame(useDate, 'day')
                            ? ' calendar-current-date'
                            : ''
                        : day.startOf('month') < useDate.startOf('month')
                            ? ' calendar-previous-date'
                            : ' calendar-future-date';

        className += addition;

        return className;
    }

    /**
     * Build day class name based on data number.
     * @param {date} date 
     */
    const dayClassName = (date) => {
        const search = date.toISODate();
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

        if (search === selectedDay.toISODate()) {
            className += ' selected-date';
        }
        
        return className;
    }

    const is_today = (day) => {
        return day.day === selectedDay.day && day.month === selectedDay.month && day.year === selectedDay.year;
    }

    const abbreviate = (str) => str.substring(0, 3);

    return (
        <React.Fragment>
            <Card className="calendar">
                <div className="calendar-header">
                    <div className="calendar-month-btn" onClick={(() => {
                        setSelectedDay(selectedDay.set({month: selectedDay.month - 1}));
                    })}>
                        <FaAngleLeft />
                    </div>
                    <div className="calendar-header-month">
                        {selectedDay.monthLong}{selectedDay.year !== dt.year && <span>&nbsp;{selectedDay.year}</span>}
                    </div>
                    <div className="calendar-month-btn" onClick={(() => {
                        setSelectedDay(selectedDay.set({month: selectedDay.month + 1}));
                    })}>
                        <FaAngleRight />
                    </div>
                </div>
                {!is_today(dt) &&
                    <div className="calendar-btn-container">
                        <div className="calendar-today-btn" onClick={(()=> setSelectedDay(dt))}>
                            Today
                        </div>
                    </div>
                }
                <div className="calendar-week calendar-week-header">
                    {dayAbbervs.map((d, index) => <div key={index}>{d}</div>)}
                </div>
                {/* {Map through calendar weeks} */}
                {calendar.map((week) => (
                    <div key={week.week} className="calendar-week">
                    {week.days.map((day, index) => (
                        <div key={index} className={dateClassName(day)}>
                            <div className={dayClassName(day)} onClick={(() => setSelectedDay(day))}>
                                {day.day}
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