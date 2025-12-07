import { dbPool } from '../../../dbPool.js';

async function getBookings() {
  const data = await dbPool.query(`SELECT b. *,  
    json_build_object(
      'name' , c.name,
      'email' , c.email
    ) AS customer,
    json_build_object(
      'vehicle_name' , v.vehicle_name,
      'daily_registration_number' , v.daily_rent_price
    ) AS vehicle 
    FROM bookings b
    LEFT JOIN vehicles v ON b.vehicle_id = v.id 
    LEFT JOIN users c ON b.customer_id = c.id`);
  // const
  // console.log(data.rows);
  return data.rows;
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
