import express from 'express';
import auth from '../auth/auth.middleware.js';
import controller from './controllers/users.controller.js';

const router = express.Router();

router.get('/', auth, controller.getUsers);
router.put('/:userId', auth, controller.updateUser);
router.delete('/:userId', auth, controller.deleteUser);
export default router;
