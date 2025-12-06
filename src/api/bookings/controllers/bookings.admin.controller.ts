import express from 'express';
import { dbPool } from '../../../dbPool';
import type { UserResponse } from '../../../types/User';

export async function getBookingsByAdmin() {
  const data = await dbPool.query('SELECT * FROM bookings');
  return {
    status: 'success',
    message: 'Bookings fetched successfully',
    data: data.rows,
  };
}
export async function putBookingByAdmin(req: express.Request) {
  const { status } = req.body;
  const id = req.params.id;

  if (status === 'returned') {
    try {
      const dataUpdated = await dbPool.query(
        'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
      if (dataUpdated) {
        const updateVehicle = await dbPool.query(
          'UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING *',
          ['returned', id]
        );
        if (updateVehicle) {
          const data = await dbPool.query(
            'SELECT * FROM bookings WHERE id = $1',
            [id]
          );
          // ? have to make more changes according documentation
          // TODO I have to remove few things from the response
          const result = {
            success: true,
            message: 'Booking returned successfully',
            data: { ...data.rows[0], status: 'returned' },
          };
          return result;
        }
      }

      // return data.rows[0];
    } catch (err) {
      console.log(err);
    }
  }
}
