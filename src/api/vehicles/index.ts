import express from 'express';
import auth from '../auth/auth.middleware';
import {
  getVehicle,
  getVehicles,
  postVehicle,
  putVehicle,
} from './controllers/vehicles.controller';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  // console.log(req.user);
  // res.send('Welcome to the Vehicles API!');
  // res.send(getVehicles());
  const result = await getVehicles();
  res.send(result);
});
router.get(
  '/:id',
  auth,
  async (req: express.Request, res: express.Response) => {
    const result = await getVehicle(Number(req.params.id) as number);
    res.send(result);
  }
);
router.post('/', auth, async (req, res) => {
  const user = req.user;
  if (user?.role !== 'admin') {
    res.status(401).send('Access denied');
  }
  const data = req.body.vehicle;
  const result = await postVehicle(data);
  res.send(result);
});
router.put('/:id', auth, putVehicle);
export default router;
