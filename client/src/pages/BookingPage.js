import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import TimeSlot from '../components/TimeSlot';
import ConfirmBooking from '../components/ConfirmBooking';
import 'react-calendar/dist/Calendar.css';
import '../styles/bookingPage.css';
import Breadcrumb from '../components/Breadcrumb'

export default function BookingPage({selectedClinic}) {
    const currentDate = new Date();
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    
    const [showModal, setShowModal] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [showCalendar, setShowCalendar] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleBookClick = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
        setShowModal(true);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setShowCalendar(false); 
    }
    
    const handleBackToCalendar = () => {
        setSelectedDate(null);
        setShowCalendar(true); 
    };

    const resetTimeSlot = () => {
        setSelectedTimeSlot(null);
    };

    return (
            <div className="container my-4">
                <Breadcrumb 
                    clinic={selectedClinic}
                    handleCalendar={handleBackToCalendar} 
                    date={selectedDate}
                    timeslot={selectedTimeSlot}
                />
                <div className="row justify-content-center">
                        <div className="card justify-content-center align-items-flex-end">
                            <div className="card-body">
                                {showCalendar ? (
                                   <div className="all d-lg-flex align-items-center justify-content-center">
                                   <div className="col-lg-4 col-md-6 col-sm-12">
                                       <div className="calendar-container" id="leftCalendar">
                                           <Calendar className="calendar" activeStartDate={currentDate} onDateSelect={handleDateSelect} />
                                       </div>
                                   </div>
                                   <div className="col-lg-4 col-md-6 col-sm-12">
                                       <div className="calendar-container">
                                           <Calendar className="calendar" activeStartDate={nextMonthDate} onDateSelect={handleDateSelect} />
                                       </div>
                                   </div>
                               </div>
                                ) : (
                                    <>
                                    <TimeSlot onBookClick={handleBookClick} />
                                </>
                                )}
                            </div>
                        </div>
                </div>
                <ConfirmBooking 
                    show={showModal} 
                    onHide={() => setShowModal(false)} 
                    timeSlot={selectedTimeSlot} 
                    date={selectedDate}
                    onReset={resetTimeSlot}
                />
            </div>
    );
}


