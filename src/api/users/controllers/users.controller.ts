import express from 'express';
import type { UserResponse } from '../../../types/User.js';
import services from '../services/user.service.js';
import adminService from '../services/admin.service.js';

// GET users
async function getUsers(req: express.Request, res: express.Response) {
  const user = req.user;
  if (user?.role !== 'admin') {
    res.status(401).send('Access denied');
  }
  // res.send(await adminService.getAllUsers());
  const data = await adminService.getAllUsers();
  res.send({
    success: true,
    message: 'Users retrieved successfully',
    data: data,
  });
}

// PUT user
async function updateUser(req: express.Request, res: express.Response) {
  const user = req.user;
  const id = req.params.userId;
  const body = req.body;

  // const { id, name, email, phone, role } = newUser;
  if (user?.role !== 'admin') {
    if (user?.email !== body.email && user) {
      //  return 'Forbidden';
      res.status(403).send('Unauthorized Access');
      return;
    }
    // res.status(401).send('Access denied');
    res.send(await services.updateUser(body, Number(id)));
  }
  // res.send(await services.updateUser(req));
  // res.send(await adminService.updateUser(user));

  const data = await services.updateUser(body, Number(id));
  res.send({
    success: true,
    message: 'User updated successfully',
    data: data,
  });
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
    success: true,
    message: 'User deleted successfully',
  };
  res.send(result);
}

export default { getUsers, updateUser, deleteUser };
