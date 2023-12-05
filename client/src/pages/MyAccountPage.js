import React from "react";
import axios from "axios";
import { useState, useEffect} from "react";

const MyAccountPage = () => {
    const [appointment, setSelectedAppointment] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () =>  {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/appointments', {
                    headers: {'Authorization': `Bearer ${token}` }
                });
                setSelectedAppointment(response.data);
            } catch(error) {
                console.error('Error fetching appointment:', error);
            }
        };

        fetchAppointments();
    })
}

