import express from 'express';
import { dbPool } from '../../../dbPool';
import type { UserResponse } from '../../../types/User';
import type { Vehicle } from '../../../types/vehicle';

export async function getBookings(req: express.Request) {
  const user = req?.user as UserResponse;
  const userId = user?.id;
  return await dbPool.query('SELECT * FROM bookings WHERE user_id = $1', [
    userId,
  ]);
}

export async function addBooking(req: express.Request) {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

  const vehicleData = await dbPool.query(
    'SELECT * FROM vehicles WHERE id = $1',
    [vehicle_id]
  );
  const vehicle = vehicleData.rows[0] as Vehicle;
  if (vehicle.availability_status === 'booked') {
    return 'Vehicle is already booked';
  }
  const times = {
    start: new Date(rent_start_date).getTime() / 1000 / 60 ** 2 / 24,
    end: new Date(rent_end_date).getTime() / 1000 / 60 ** 2 / 24,
  };

  const totalTime = times.end - times.start;

  const vehiclePrice = vehicle.daily_rent_price;
  const totalPrice = totalTime * vehiclePrice;

  const wholeData = {
    customer_id,
    vehicle_id,
    start_date: new Date(rent_start_date).toISOString(),
    end_date: new Date(rent_end_date).toISOString(),
    total_price: totalPrice,
    status: 'booked',
  };
  const data = await dbPool.query(
    'INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [
      wholeData.customer_id,
      wholeData.vehicle_id,
      wholeData.start_date,
      wholeData.end_date,
      wholeData.total_price,
      wholeData.status,
    ]
  );
  if (data) {
    return data.rows[0];
  }

  return 'ok';
}
export async function putBooking(req: express.Request) {
  const { id, status } = req.body;

  // const cancelled = 'cancelled';
  try {
    const dataUpdate = await dbPool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    const updateVehicle = await dbPool.query(
      'UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING *',
      ['returned', id]
    );
    // return data.rows[0];
    if (dataUpdate) {
      // return dataUpdate.rows[0];
      const data = await dbPool.query('SELECT * FROM bookings WHERE id = $1', [
        id,
      ]);
      // ? have to make more changes according documentation
      // TODO I have to remove few things from the response
      const result = {
        success: true,
        message: 'Booking cancelled successfully',
        data: { ...data.rows[0], status: 'cancelled' },
      };
      return result;
    }
  } catch (err) {
    console.log(err);
    return 'error';
  }
}
