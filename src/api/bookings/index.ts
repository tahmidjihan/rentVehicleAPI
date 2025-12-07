import express from 'express';
import type { UserResponse } from '../../types/User';
import {
  getBookingsByAdmin,
  putBookingByAdmin,
} from './controllers/bookings.admin.controller';
import controller from './controllers/bookings.controller';
const router = express.Router();

// router.use('/', (req, res) => {
//   res.send('this is bookings route');
// });
router.get('/', controller.getBookings);
router.post('/', controller.addBooking);
router.put('/:bookingId', async (req, res) => {
  // res.send(await addBooking(req));
  const user = req?.user as UserResponse;
  if (user?.role !== 'admin') {
    // res.status(401).send('Access denied');
    res.send(await controller.putBooking(req));
    return;
  }
  res.send(await putBookingByAdmin(req));
});
export default router;
