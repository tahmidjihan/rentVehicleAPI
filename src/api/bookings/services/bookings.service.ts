import { dbPool } from '../../../dbPool';

async function getBookings(userId: number) {
  const data = await dbPool.query(
    'SELECT * FROM bookings WHERE customer_id = $1',
    [userId]
  );
  return data;
}
async function isBooked(vehicleId: number) {
  const data = await dbPool.query('SELECT * FROM vehicles WHERE id = $1', [
    vehicleId,
  ]);
  //   return data;
  if (data.rows[0].status === 'booked') {
    return {
      success: false,
      message: 'Vehicle is currently booked',
      error: ' Vehicle is currently booked',
    };
  }
  return {
    success: true,
    message: 'Vehicle is available',
    data: data.rows[0],
  };
}
async function addBooking(data: any) {
  const result = await dbPool.query(
    'INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [
      data.customer_id,
      data.vehicle_id,
      data.start_date,
      data.end_date,
      data.total_price,
      data.status,
    ]
  );
  if (result) {
    const updateVehicle = await dbPool.query(
      'UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING *',
      ['booked', data.vehicle_id]
    );
    const response = {
      success: true,
      message: 'Booking added successfully',
      data: {
        ...result.rows[0],
        vehicle: updateVehicle.rows[0],
      },
    };
    return response;
  }
  return {
    success: false,
    message: 'Error adding booking',
    error: 'Error adding booking',
  };
  // return result;
}
// async function cancelBooking(id: number) {}
export default { getBookings, isBooked, addBooking };
