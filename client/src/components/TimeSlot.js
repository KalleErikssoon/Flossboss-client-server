import React from "react";
import "../styles/timeslot.css";

export default function TimeSlot({ onBookClick, timeSlots }) {
  // Check if the timeSlots array is empty
  if (timeSlots.length === 0) {
    return (
      <p className="no-timeslots">Sorry, there are no time slots available.</p>
    );
  }

  return (
    <ul className="timeslot-list">
      {timeSlots.map((timeslotObj, index) => (
        <li key={index} className="timeslot-item">
          <span className="timeslot">
            {timeslotObj.timeFrom + "-" + timeslotObj.timeTo}
          </span>
          <button
            className="btn btn-primary"
            onClick={() =>
              onBookClick(
                timeslotObj.timeFrom + "-" + timeslotObj.timeTo,
                timeslotObj.appointments
              )
            }
          >
            Book
          </button>
        </li>
      ))}
    </ul>
  );
}
