import { dbPool } from '../../../dbPool.js';
import express from 'express';
import type { UserResponse } from '../../../types/User.d.js';
import services from '../services/user.service.js';
import adminService from '../services/admin.service.js';

// GET users
async function getUsers(req: express.Request, res: express.Response) {
  const user = req.user;
  if (user?.role !== 'admin') {
    res.status(401).send('Access denied');
  }
  res.send(await adminService.getAllUsers());
}

// PUT user
async function updateUser(req: express.Request, res: express.Response) {
  const user = req.user;
  if (user?.role !== 'admin') {
    // res.status(401).send('Access denied');
    res.send(await services.updateUser(req));
  }
  // res.send(await services.updateUser(req));
  res.send(await adminService.updateUser(user));
}

// DELETE user
export async function deleteUser(req: express.Request, res: express.Response) {
  const user = req?.user as UserResponse;
  if (user?.role !== 'admin') {
    res.status(401).send('Access denied');
  }

  const userId = req.params.userId;

  const data = await adminService.deleteUser(Number(userId));
  // res.send(data);
  const result = {
    status: 'success',
    message: 'User deleted successfully',
  };
}

export default { getUsers, updateUser, deleteUser };
