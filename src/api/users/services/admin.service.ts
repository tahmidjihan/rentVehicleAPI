import { dbPool } from '../../../dbPool.js';
// import express from 'express';
// import type { UserResponse } from '../../../types/User';

export async function getAllUsers() {
  const data = await dbPool.query('SELECT * FROM users');
  return data.rows;
}

export async function deleteUser(userId: number) {
  const bookingData = await dbPool.query(
    'SELECT * FROM bookings WHERE customer_id = $1',
    [userId]
  );
  if (bookingData.rows.length > 0) {
    bookingData.rows.forEach((booking) => {
      if (booking.status === 'booked') {
        return 'User has active bookings';
      }
    });
  }

  const data = await dbPool.query('DELETE FROM users WHERE id = $1', [userId]);
  // res.send({ status: 'success', message: 'User deleted successfully' });
  return { success: true, message: 'User deleted successfully' };
}
export default {
  getAllUsers,
  deleteUser,
};
