import React from 'react'
import '../styles/timeslot.css'

export default function TimeSlot({ onBookClick, timeSlots }) {
    const availableTimeSlots = timeSlots;

    return (
        <ul className="timeslot-list">
            {availableTimeSlots.map((slot, index) => (
                <li key={index} className="timeslot-item">
                    <span className="timeslot">{slot}</span>
                    <button className="btn btn-primary" onClick={() => onBookClick(slot)}>Book</button>
                </li>
            ))}
        </ul>
    );
}