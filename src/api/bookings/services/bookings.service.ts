import { dbPool } from '../../../dbPool.js';

async function getBookings(userId: number) {
  const data = await dbPool.query(
    `SELECT 
      b.id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,
    json_build_object(
     'vehicle_name' , v.vehicle_name,
     'registration_number' , v.registration_number,
     'type' , v.type
     ) AS vehicle 
    FROM bookings b
    LEFT JOIN vehicles v ON b.vehicle_id = v.id
    WHERE customer_id = $1
    `,
    [userId]
  );
  return data;
}
async function vehicleToBook(vehicleId: number) {
  const data = await dbPool.query('SELECT * FROM vehicles WHERE id = $1', [
    vehicleId,
  ]);
  //   return data;
  if (data.rows[0].status === 'booked') {
    return {
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
    const vehicleData = await dbPool.query(
      'SELECT * FROM vehicles WHERE id = $1',
      [data.vehicle_id]
    );

    const response = {
      ...result.rows[0],
      vehicle: {
        vehicle_name: vehicleData.rows[0].vehicle_name,
        daily_rent_price: vehicleData.rows[0].daily_rent_price,
      },
    };
    return response;
  }
  return {
    error: 'Error adding booking',
  };
  // return result;
}
// check is user
async function checkUser(id: number, userId: number) {
  const data = await dbPool.query('SELECT * FROM bookings WHERE id = $1', [id]);

  if (!data.rows[0]) {
    return {
      success: false,
      message: 'Booking not found',
      error: 'Booking not found',
    };
  }
  if (data.rows[0].customer_id !== userId) {
    //  console.log('forbade');
    return {
      success: false,
      message: 'Forbidden',
      error: 'Forbidden',
    };
  }
  return {
    success: true,
    message: 'Granted',
    data: data.rows[0],
  };
}
// booking PUT
async function putBooking(id: number, status: string) {
  const dataUpdate = await dbPool.query(
    'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  const updateVehicle = await dbPool.query(
    'UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING *',
    ['returned', id]
  );
  console.log(updateVehicle.rows);
  if (dataUpdate && updateVehicle) {
    const data = await dbPool.query('SELECT * FROM bookings WHERE id = $1', [
      id,
    ]);
    return data;
  }
}
// async function cancelBooking(id: number) {}
export default {
  getBookings,
  vehicleToBook,
  addBooking,
  checkUser,
  putBooking,
};
