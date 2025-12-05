import express from 'express';
import auth from './auth';
import vehicles from './vehicles';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Rent Vehicle API!');
});
router.use('/auth', auth);
router.use('/vehicles', vehicles);

export default router;
