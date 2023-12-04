import React, { useState } from "react";
import Calendar from "../components/Calendar";
import TimeSlot from "../components/TimeSlot";
import ConfirmBooking from "../components/ConfirmBooking";
import BookingUnavailable from "../components/BookingUnavailable";
import "react-calendar/dist/Calendar.css";
import "../styles/bookingPage.css";
import Breadcrumb from "../components/Breadcrumb";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function BookingPage() {
  const userId = localStorage.getItem("userIdSession");
  const currentDate = new Date();
  const nextMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  ); //checks until the end of the month after the current one
  const location = useLocation();
  const { clinicId, clinicName } = location.state || {};
  //states to handle different components visibility/logic and relevant data to be able to book appoitments
  const [calendarUpdateTrigger, setCalendarUpdateTrigger] = React.useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showUnavailableModal, setshowUnavailableModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState([]);
  const [availableTimeSlots, setTimeSlots] = useState([]);

  //method called on entering page to get all appointments available from database in the date interval
  React.useEffect(() => {
    let isComponentMounted = true; // Flag to track component mount status

    async function getAppointment() {
      try {
        const response = await axios.get(
          `http://localhost:3000/clinics/${clinicId}/appointments/calendar`
        );
        if (isComponentMounted) {
          const date = response.data;
          console.log(date);
          setDates(date);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
    getAppointment();
    // Cleanup function
    return () => {
      isComponentMounted = false;
    };
  }, [calendarUpdateTrigger, clinicId]);

  // Live Update

  React.useEffect(() => {
    // Create a new EventSource instance
    const eventSource = new EventSource(
      "http://localhost:3000/clinics/events",
      { withCredentials: true }
    ); // Adjust the URL to your server

    // Handle incoming messages
    eventSource.onmessage = (event) => {
      const newDateUpdate = JSON.parse(event.data);
      console.log("Received SSE message:", newDateUpdate);

      // Update the dates state
      setDates((currentDates) => {
        return {
          ...currentDates,
          [newDateUpdate.date]: newDateUpdate.update, // Updating only the specific date
        };
      });
    };

    // Handle any errors
    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    // Clean up on component unmount
    return () => {
      eventSource.close();
    };
  }, []);

  //function to handle user clicking book for a specific timeslot
  // sets the selected timeslot and appointment ID for that timeslot, then uses an axios method to patch the selected appointment to pending
  const handleBookClick = async (timeSlot, appointment) => {
    const clinic_id = clinicId;
    setSelectedTimeSlot(timeSlot);
    setSelectedAppointment(appointment);
    setTimeout(async () => {
      const response = await axios.patch(
        `http://localhost:3000/users/${userId}/appointments/${appointment}/pending`,
        { clinicId: clinic_id }
      );

      if (response.data === "Booking is in Progress") {
        setShowBookingModal(true);
      } else {
        setshowUnavailableModal(true);
      }
    }, 0);
  };

  //handles when a user selects a date
  //gets the appointments available on the selected date through an axios request to the express server
  //creates an object that maps the available timeslots/appointment ID's
  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    setSelectedTimeSlot(null);
    try {
      const formattedDate = [
        date.getFullYear(),
        ("0" + (date.getMonth() + 1)).slice(-2),
        ("0" + date.getDate()).slice(-2),
      ].join("-");
      const response = await axios.get(
        `http://localhost:3000/clinics/${clinicId}/appointments?selectedDate=${formattedDate}`
      );
      const timeslots = response.data.map((appointment) => {
        return {
          timeFrom: appointment.timeFrom,
          timeTo: appointment.timeTo,
          appointments: appointment._id,
        };
      });
      setTimeSlots(timeslots);
    } catch (error) {
      console.error("Error fetching timeslots:", error);
      setTimeSlots([]);
    }
  };

  //function to handle clicking on confirm booking
  //makes an axios request to the server for patching the appointment to pending
  const confirmBooking = async () => {
    const clinic_id = clinicId;
    try {
      await axios.patch(
        `http://localhost:3000/users//${userId}/appointments/${selectedAppointment}/confirm`,
        { clinicId: clinic_id }
      );
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }
  };

  //function to handle clicking back to calendar in the breadcrumbs
  const handleBackToCalendar = () => {
    setSelectedDate(null);
    setTimeSlots([]);
    setShowCalendar(true);
    setCalendarUpdateTrigger((prev) => prev + 1);
  };

  //function to reset the selected timeslot from the user
  const resetTimeSlot = async (date) => {
    const clinic_id = clinicId;
    try {
      await axios.patch(
        `http://localhost:3000/users//${userId}/appointments/${selectedAppointment}/cancel`,
        { clinicId: clinic_id }
      );
      handleDateSelect(date);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  return (
    <div className="container my-4">
      <Breadcrumb
        clinic={clinicName}
        handleCalendar={handleBackToCalendar}
        date={selectedDate}
        timeslot={selectedTimeSlot}
      />
      <div className="row justify-content-center">
        <div className="card fluid justify-content-center align-items-flex-end">
          <div
            className={`card-body ${
              showCalendar ? "calendar-view" : "timeslot-view"
            }`}
          >
            {showCalendar ? (
              <div className="all d-flex flex-wrap align-items-center justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="calendar-container">
                    <Calendar
                      className="calendar"
                      activeStartDate={currentDate}
                      onDateSelect={handleDateSelect}
                      datesAvailable={dates}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="calendar-container">
                    <Calendar
                      className="calendar"
                      activeStartDate={nextMonthDate}
                      onDateSelect={handleDateSelect}
                      datesAvailable={dates}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <TimeSlot
                className="timeslot"
                onBookClick={handleBookClick}
                timeSlots={availableTimeSlots}
              />
            )}
          </div>
        </div>
      </div>
      <ConfirmBooking
        show={showBookingModal}
        onHide={() => setShowBookingModal(false)}
        timeSlot={selectedTimeSlot}
        date={selectedDate}
        onReset={resetTimeSlot}
        onConfirm={confirmBooking}
        clinicName={clinicName}
      />
      <BookingUnavailable
        show={showUnavailableModal}
        onHide={() => setshowUnavailableModal(false)}
        date={selectedDate}
        onReset={handleDateSelect}
      />
    </div>
  );
}
