import express from 'express';
import { dbPool } from '../../../dbPool';
import type { UserResponse } from '../../../types/User';

export async function getBookings(req: express.Request) {
  const user = req?.user as UserResponse;
  const userId = user?.id;
  return await dbPool.query('SELECT * FROM bookings WHERE user_id = $1', [
    userId,
  ]);
}
