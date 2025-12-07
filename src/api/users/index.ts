import express from 'express';
import {
  deleteUser,
  getAllUsers,
  updateUser as updateUserByAdmin,
} from './services/admin.service';
import type { UserResponse } from '../../types/User';
import { updateUser } from './services/user.service';
import controller from './controllers/users.controller';

const router = express.Router();

router.get('/', controller.getUsers);
router.put('/:userId', controller.updateUser);
router.delete('/:userId', controller.deleteUser);
export default router;
