import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyAccountPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userIdSession'); // Replace with your method of storing user ID
        if (userId) {
            fetchAppointments(userId);
        }
    }, []);

    const fetchAppointments = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${userId}/appointments`);
            setAppointments(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>My Appointments</h1>
            {/* Render your appointments here */}
            {appointments.map(appointment => (
                <div key={appointment._id}>
                {/* Display appointment details */}
            <p>Date: {appointment.date}</p>
            <p>Start: {appointment.timeTo}</p>
            <p>End: {appointment.timeFrom}</p>


            {/* Add more details here */}
            </div>
            ))}
        </div>
    );
};

export default MyAccountPage;
