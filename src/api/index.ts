import express from 'express';
import auth from './auth/index.js';
import vehicles from './vehicles/index.js';
import users from './users/index.js';
import bookings from './bookings/index.js';
import authorize from './auth/auth.middleware.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Rent Vehicle API!');
});
router.use('/auth', auth);
router.use('/vehicles', vehicles);
router.use('/users', authorize, users);
router.use('/bookings', authorize, bookings);
export default router;
