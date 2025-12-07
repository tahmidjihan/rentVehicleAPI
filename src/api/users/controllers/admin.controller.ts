import { dbPool } from '../../../dbPool';
import express from 'express';
import type { UserResponse } from '../../../types/User';

export async function getAllUsers() {
  const data = await dbPool.query('SELECT * FROM users');
  return data.rows;
}
export async function updateUser(req: express.Request, res: express.Response) {
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
export async function deleteUser(req: express.Request, res: express.Response) {
  const user = req?.user as UserResponse;
  if (user?.role !== 'admin') {
    res.status(401).send('Access denied');
  }

  const userId = req.params.userId;

  const bookingData = await dbPool.query(
    'SELECT * FROM bookings WHERE customer_id = $1',
    [userId]
  );
  if (bookingData.rows.length > 0) {
    // return { status: 'error', message: 'User has active bookings' };
    bookingData.rows.forEach((booking) => {
      if (booking.status === 'booked') {
        res.status(400).send('User has active bookings');
        return;
      }
    });
  }

  const data = await dbPool.query('DELETE FROM users WHERE id = $1', [userId]);
  res.send({ status: 'success', message: 'User deleted successfully' });
}
