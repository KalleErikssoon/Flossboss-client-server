const express = require('express');
const router = express.Router({ mergeParams: true });
const UserController = require('../controllers/userController')

const controller = new UserController();
/* GET users listing. */
router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.get('/:id/appointments', controller.getUserAppointments);
router.post('/', controller.createUser);
router.delete('/:id', controller.deleteById);
router.patch('/:id', controller.updateByID);
router.patch('/:id/appointments/:appointmentId/pending', controller.pendingAppointment);
router.patch('/:id/appointments/:appointmentId/confirm', controller.confirmAppointment);
router.patch('/:id/appointments/:appointmentId/cancel', controller.cancelAppointment);
router.put('/logout', controller.decrementLoggedInUsers);
router.patch('/:id/appointments/:appointmentId/cancelBooked', controller.cancelBookedAppointment);



module.exports = router;
