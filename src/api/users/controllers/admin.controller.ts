import { dbPool } from '../../../dbPool';
import express from 'express';
import type { UserResponse } from '../../../types/User';

export async function getAllUsers() {
  const data = await dbPool.query('SELECT * FROM users');
  return data.rows;
}
export async function updateUserByAdmin(req: express.Request) {
  // const user = req?.user as UserResponse;
  const { id, name, email, phone, role } = req.body.user;

  const data = await dbPool.query(
    'UPDATE users SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5',
    [name, email, phone, role, id]
  );
  // console.log(data);
  if (data) {
    return { status: 'success' };
  }
}
// export async function deleteUser(id: number) {
//   const data = await dbPool.query('DELETE FROM users WHERE id = $1', [id]);
//   return data.rows;
// }
