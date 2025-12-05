import express from 'express';
import auth from '../auth/auth.middleware';
import { vehiclePost } from './controllers/vehiclePost.controller';
import type { Vehicle } from './vehicle';
const router = express.Router();

router.get('/', auth, (req, res) => {
  console.log(req.user);
  res.send('Welcome to the Vehicles API!');
});
router.post('/', auth, async (req, res) => {
  const user = req.user;
  if (user?.role !== 'admin') {
    res.status(401).send('Access denied');

    // res.send('Welcome to the Vehicles API!');
  }
  const data: Vehicle = req.body.vehicle;
  const result = await vehiclePost(data);
  res.send(result);
});
export default router;
