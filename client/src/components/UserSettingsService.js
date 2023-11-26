//Service class that handles API calls for the UserSettings page

import axios from "axios";

const BASE_URL = `http://localhost:3000/clinics/appointments/available/${clinic._id}`

const updateUserInfo = async (userData) => {
    return await axios.put(, userData)
}

export default { updateUserInfo };