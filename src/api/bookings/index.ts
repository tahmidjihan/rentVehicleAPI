import express from 'express';

// import {
//   getBookingsByAdmin,
//   putBookingByAdmin,
// } from './controllers/bookings.admin.controller';
import controller from './controllers/bookings.controller.js';
const router = express.Router();

// router.use('/', (req, res) => {
//   res.send('this is bookings route');
// });
router.get('/', controller.getBookings);
router.post('/', controller.addBooking);
router.put('/:bookingId', controller.putBooking);
export default router;
