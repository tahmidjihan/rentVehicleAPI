import express from 'express';
import {
  deleteUser,
  getAllUsers,
  updateUserByAdmin,
} from './controllers/admin.controller';
import type { UserResponse } from '../../types/User';
import { updateUser } from './controllers/user.controller';

const router = express.Router();

router.get('/', async (req, res) => {
  // res.send('Welcome to the Users API!');
  const user = req.user;
  if (user?.role !== 'admin') {
    res.status(401).send('Access denied');
  }
  res.send(await getAllUsers());
});

router.put('/:userId', async (req: express.Request, res: express.Response) => {
  if (req.body) {
    const user = req?.user as UserResponse;
    // console.log(user);
    if (user?.role !== 'admin') {
      res.send(await updateUser(req));
      return;
    }
    // console.log('only admin');
    res.send(await updateUserByAdmin(req));
  }
  res.status(400).send('No data received');
});
export default router;
router.delete('/:userId', deleteUser);
