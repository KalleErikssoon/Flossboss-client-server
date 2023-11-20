import React from 'react'
import '../styles/timeslot.css'

export default function TimeSlot({ onBookClick }) {
    const timeSlots = ["10:00-11:00", "11:00-12:00", "12:00-13:00"];

    return (
        <ul className="timeslot-list">
            {timeSlots.map((slot, index) => (
                <li key={index} className="timeslot-item">
                    <span className="timeslot">{slot}</span>
                    <button className="btn btn-primary" onClick={() => onBookClick(slot)}>Book</button>
                </li>
            ))}
        </ul>
    );
}