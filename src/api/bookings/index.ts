import express from 'express';
import type { UserResponse } from '../../types/User';
import {
  getBookingsByAdmin,
  putBookingByAdmin,
} from './controllers/bookings.admin.controller';
import {
  addBooking,
  getBookings,
  putBooking,
} from './controllers/bookings.controller';
const router = express.Router();

// router.use('/', (req, res) => {
//   res.send('this is bookings route');
// });
router.get('/', async (req, res) => {
  const user = req?.user as UserResponse;
  if (user?.role !== 'admin') {
    res.send(await getBookings(req as express.Request));
  }
  res.send(await getBookingsByAdmin());
});
router.post('/', async (req, res) => {
  res.send(await addBooking(req));
});
router.put('/', async (req, res) => {
  // res.send(await addBooking(req));
  const user = req?.user as UserResponse;
  if (user?.role !== 'admin') {
    // res.status(401).send('Access denied');
    res.send(await putBooking(req));
    return;
  }
  res.send(await putBookingByAdmin(req));
});
export default router;
