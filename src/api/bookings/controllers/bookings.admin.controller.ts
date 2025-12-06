import express from 'express';
import { dbPool } from '../../../dbPool';

export async function getBookingsByAdmin() {
  const data = await dbPool.query('SELECT * FROM bookings');
  return data.rows;
}
export async function putBookingByAdmin(req: express.Request) {
  const { id, status } = req.body;
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
            message: 'Booking cancelled successfully',
            data: { ...data.rows[0], status: 'cancelled' },
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
