import { dbPool } from '../../../dbPool.js';

async function getBookings() {
  const data = await dbPool.query('SELECT * FROM bookings');
  return {
    success: true,
    message: 'Bookings fetched successfully',
    data: data.rows,
  };
}
async function putBooking(status: string, id: number) {
  // console.log('status' + status + ', id: ' + id);
  if (status === 'returned') {
    console.log('its admin');
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

        const data = await dbPool.query(
          'SELECT * FROM bookings WHERE id = $1',
          [id]
        );
        // console.log(data);
        return data;
      }

      // return data.rows[0];
    } catch (err) {
      console.log(err);
    }
  }
}
export default {
  getBookings,
  putBooking,
};
