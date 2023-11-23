import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import TimeSlot from '../components/TimeSlot';
import ConfirmBooking from '../components/ConfirmBooking';
import 'react-calendar/dist/Calendar.css';
import '../styles/bookingPage.css';
import Breadcrumb from '../components/Breadcrumb'
import axios from 'axios'

export default function BookingPage({selectedClinic}) {
    
    const currentDate = new Date();
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    const [showModal, setShowModal] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showCalendar, setShowCalendar] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dates, setDates] = useState([]);
    const [availableTimeSlots, setTimeSlots] = useState([]);
    
    const id = '655cb0c8596ef74251a5cc3d';
    React.useEffect(() => {
        let isComponentMounted = true; // Flag to track component mount status

    async function getAppointments() {
      try {
        const response = await axios.get(`http://localhost:3000/clinics/${id}/appointments/`)
        if (isComponentMounted) {
            const dates = response.data.map(appointment => appointment.date.split('T')[0]);
            setDates(dates);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
    getAppointments();
    // Cleanup function
    return () => {
      isComponentMounted = false;
        };
    }, []);

    const handleBookClick = (timeSlot, appointment) => {
        setSelectedTimeSlot(timeSlot);
        setSelectedAppointment(appointment);
        setShowModal(true);
    };

    const handleDateSelect = async (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
        try {
            const formattedDate = [
                date.getFullYear(),
                ('0' + (date.getMonth() + 1)).slice(-2),
                ('0' + date.getDate()).slice(-2)
            ].join('-');
            const response = await axios.get(`http://localhost:3000/clinics/${id}/appointments?selectedDate=${formattedDate}`);
            const timeslots = response.data.map(appointment => {
                return {
                "timeslots": appointment.timeSlot,
                "appointments": appointment._id
                };
            });
            setTimeSlots(timeslots);
        } catch (error) {
            console.error("Error fetching timeslots:", error);
        }
    };
    
    const confirmBooking = async () => {
        const userId = "abcaisodjasof"
        try {
            await axios.patch(`http://localhost:3000/users//${userId}/appointments/${selectedAppointment}/confirm`);
        } catch (error) {
            console.error("Error confirming booking:", error);
        }
    };


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
            <div className="card fluid justify-content-center align-items-flex-end">
                <div className={`card-body ${showCalendar ? 'calendar-view' : 'timeslot-view'}`}>
                    {showCalendar ? (
                        <div className="all d-flex flex-wrap align-items-center justify-content-center">
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="calendar-container">
                                    <Calendar className="calendar" activeStartDate={currentDate} onDateSelect={handleDateSelect} datesAvailable={dates}/>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <div className="calendar-container">
                                    <Calendar className="calendar" activeStartDate={nextMonthDate} onDateSelect={handleDateSelect} datesAvailable={dates}/>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <TimeSlot className="timeslot" onBookClick={handleBookClick} timeSlots={availableTimeSlots}/>
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
                onConfirm={confirmBooking}
            />
        </div>
    );
}


