import express from 'express';
import auth from './auth';
import vehicles from './vehicles';
import users from './users';
import bookings from './bookings';
import authorize from './auth/auth.middleware';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Rent Vehicle API!');
});
router.use('/auth', auth);
router.use('/vehicles', vehicles);
router.use('/users', authorize, users);
router.use('/bookings', authorize, bookings);
export default router;
