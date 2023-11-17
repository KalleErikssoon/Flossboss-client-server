import React from 'react'
import Calendar from '../components/Calendar'
import 'react-calendar/dist/Calendar.css';
import '../styles/bookingPage.css' 

export default function BookingPage() {
    const currentDate = new Date();
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    return (
        <div className="all d-lg-flex align-items-center justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="calendar-container" id="leftCalendar">
                    <Calendar className="calendar" activeStartDate={currentDate} />
                </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="calendar-container">
                    <Calendar className="calendar" activeStartDate={nextMonthDate} />
                </div>
            </div>
        </div>
    );
}