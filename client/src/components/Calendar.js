import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarComponent({
  activeStartDate,
  onDateSelect,
  datesAvailable,
}) {
  const [currentDate] = useState(new Date());

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      // Format the date to 'YYYY-MM-DD' for comparison
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;
      // Check if this date is in the available dates
      return !datesAvailable.includes(dateString);
    }
    return (
      date < new Date() ||
      (view === "month" && date.getMonth() !== activeStartDate.getMonth())
    );
  };

  function onDateClick(value) {
    onDateSelect(value);
  }

  return (
    <div>
      <div>
        <Calendar
          className="calendar"
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
  );
}
