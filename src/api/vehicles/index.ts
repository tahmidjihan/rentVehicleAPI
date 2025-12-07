import express from 'express';
import auth from '../auth/auth.middleware';
import controller from './vehicles.controller';

const router = express.Router();

router.get('/', auth, controller.getVehicles);
router.get('/:id', auth, controller.getVehicle);
router.post('/', auth, controller.postVehicle);
router.put('/:id', auth, controller.putVehicle);
router.delete('/:id', auth, controller.deleteVehicle);
export default router;
