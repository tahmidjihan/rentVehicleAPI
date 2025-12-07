import express from 'express';
import auth from '../auth/auth.middleware.js';
// import {
//   getBookingsByAdmin,
//   putBookingByAdmin,
// } from './controllers/bookings.admin.controller';
import controller from './controllers/bookings.controller.js';
const router = express.Router();

// router.use('/', (req, res) => {
//   res.send('this is bookings route');
// });
router.get('/', auth, controller.getBookings);
router.post('/', auth, controller.addBooking);
router.put('/:bookingId', auth, controller.putBooking);
export default router;
