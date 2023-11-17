import React from 'react'
import {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default function CalendarComponent({activeStartDate}) {
    const [date, setDate] = useState(new Date());

    const [currentDate] = useState(new Date());

    const tileDisabled = ({ date, view, activeStartDate  }) => (
        date < new Date() || 
        (view === 'month' && date.getMonth() !== activeStartDate.getMonth())
    );

    function onDateClick(value) {
        setDate(value)
        console.log("Next step goes here!" + value)
    }

    return (
        <div>
            <div>
              <Calendar className="calendar"
                activeStartDate={activeStartDate}
                value={currentDate}
                onClickDay={onDateClick}
                navigationLabel={null}
                prevLabel={null} 
                nextLabel={null} 
                tileDisabled={tileDisabled}
              />
              <style>
            {`
                .react-calendar__navigation__prev2-button,
                .react-calendar__navigation__next2-button {
                display: none;
                }
            .react-calendar__navigation {
            pointer-events: none;`}
            </style>
            </div>
        </div>
    )
}
