import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import TimeSlot from '../components/TimeSlot';
import ConfirmBooking from '../components/ConfirmBooking';
import 'react-calendar/dist/Calendar.css';
import '../styles/bookingPage.css';
import Breadcrumb from '../components/Breadcrumb'
import axios from 'axios'

export default function BookingPage({selectedClinic, user}) {
    
    const userId = "abcaisodjasof" //random ID for testing
    const currentDate = new Date();
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); //checks until the end of the month after the current one

    //states to handle different components visibility/logic and relevant data to be able to book appoitments
    const [showModal, setShowModal] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showCalendar, setShowCalendar] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dates, setDates] = useState([]);
    const [availableTimeSlots, setTimeSlots] = useState([]);
    
    const id = '655cb0c8596ef74251a5cc3d';

    //method called on entering page to get all appointments available from database in the date interval
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

    //function to handle user clicking book for a specific timeslot
    // sets the selected timeslot and appointment ID for that timeslot, then uses an axios method to patch the selected appointment to pending
    const handleBookClick = async (timeSlot, appointment) => {
        setSelectedTimeSlot(timeSlot);
        setSelectedAppointment(appointment);
        await axios.patch(`http://localhost:3000/users//${userId}/appointments/${selectedAppointment}/pending`);
        setShowModal(true);
    };

    //handles when a user selects a date
    //gets the appointments available on the selected date through an axios request to the express server
    //creates an object that maps the available timeslots/appointment ID's
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
    

    //function to handle clicking on confirm booking
    //makes an axios request to the server for patching the appointment to pending
    const confirmBooking = async () => {
        const userId = "abcaisodjasof"
        try {
            await axios.patch(`http://localhost:3000/users//${userId}/appointments/${selectedAppointment}/confirm`);
        } catch (error) {
            console.error("Error confirming appointment:", error);
        }
    };

    //function to handle clicking back to calendar in the breadcrumbs
    const handleBackToCalendar = () => {
        setSelectedDate(null);
        setShowCalendar(true); 
    };

    //function to reset the selected timeslot from the user
    const resetTimeSlot = async () => {
        try {
            await axios.patch(`http://localhost:3000/users//${userId}/appointments/${selectedAppointment}/cancel`);
            setSelectedTimeSlot(null);
        } catch (error) {
            console.error("Error cancelling appointment:", error);
        }
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


