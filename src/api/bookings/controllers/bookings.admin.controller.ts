import express from 'express';
import { dbPool } from '../../../dbPool';

export async function getBookingsByAdmin() {
  return await dbPool.query('SELECT * FROM bookings');
}
