import React from 'react'
import '../styles/timeslot.css'

export default function TimeSlot({ onBookClick, timeSlots }) {
    return (
        <ul className="timeslot-list">
            {timeSlots.map((timeslotObj, index) => (
                <li key={index} className="timeslot-item">
                    <span className="timeslot">{timeslotObj.timeFrom + "-" + timeslotObj.timeTo}</span>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => onBookClick(timeslotObj.timeFrom + "-" + timeslotObj.timeTo, timeslotObj.appointments)}
                    >
                    Book
                    </button>
                </li>
            ))}
        </ul>
    );
}