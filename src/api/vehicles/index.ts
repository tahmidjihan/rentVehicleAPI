import express from 'express';
import auth from '../auth/auth.middleware.js';
import controller from './vehicles.controller.js';

const router = express.Router();

router.get('/', auth, controller.getVehicles);
router.get('/:id', auth, controller.getVehicle);
router.post('/', auth, controller.postVehicle);
router.put('/:id', auth, controller.putVehicle);
router.delete('/:id', auth, controller.deleteVehicle);
export default router;
