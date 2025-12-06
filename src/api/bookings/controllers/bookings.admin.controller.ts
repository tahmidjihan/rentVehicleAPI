import express from 'express';
import { dbPool } from '../../../dbPool';

export async function getBookingsByAdmin() {
  const data = await dbPool.query('SELECT * FROM bookings');
  return data.rows;
}
