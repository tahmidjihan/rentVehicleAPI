import { dbPool } from '../../../dbPool';
import express from 'express';
import type { UserResponse } from '../../../types/User';

export async function updateUser(req: express.Request) {
  const user = req?.user as UserResponse;
  const newUser = req.body.user;
  if (user.email !== newUser.email && user) {
    return 'Forbidden';
  }
  const { id, name, email, phone, role } = newUser;
  const data = await dbPool.query(
    'UPDATE users SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5',
    [name, email, phone, role, id]
  );
  if (data) {
    return { status: 'success' };
  }
}
export default { updateUser };
