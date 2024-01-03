import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarComponent({
  activeStartDate,
  onDateSelect
}) {
  const [currentDate] = useState(new Date());

  const getLastDayOfNextMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 2, 0);
  };

  const tileDisabled = ({ date, view }) => {
    // Disable tiles for days before today or after the last day of next month
    if (view === "month") {
      const today = new Date();
      const lastDayNextMonth = getLastDayOfNextMonth();
      return date < today || date > lastDayNextMonth;
    }
    return false;
  };

  function onDateClick(value) {
    onDateSelect(value);
  }

  return (
    <div>
      <Calendar
        className="calendar"
        activeStartDate={activeStartDate}
        value={currentDate}
        onClickDay={onDateClick}
        tileDisabled={tileDisabled}
      />
      <style>{`
        .react-calendar__navigation__prev2-button,
        .react-calendar__navigation__next2-button {
          display: none;
        }
        .react-calendar__navigation {
          pointer-events: none;
        }`}
      </style>
    </div>
  );
}
