import { dbPool } from '../../dbPool.js';
import type { Vehicle } from '../../types/vehicle.js';

// all vehicles GET
async function getVehicles() {
  const result = await dbPool.query('SELECT * FROM vehicles');
  return result;
}
// single vehicle GET
async function getVehicle(id: number) {
  const result = await dbPool.query('SELECT * FROM vehicles WHERE id = $1', [
    id,
  ]);

  return result;
}
// post vehicle
async function postVehicle(data: Vehicle) {
  const result = await dbPool.query(
    'INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [
      data.vehicle_name,
      data.type,
      data.registration_number,
      data.daily_rent_price,
      data.availability_status,
    ]
  );
  return result;
}
// vehicle PUT
async function putVehicle(id: number, vehicle: any) {
  const fields = [];
  const values = [];
  for (const key in vehicle) {
    if (key === 'id') {
      delete vehicle[key];
      continue;
    }
    fields.push(`${key} = $${fields.length + 1}`);
    values.push(vehicle[key]);
  }
  const query = fields.join(', ');
  const data = await dbPool.query(
    `UPDATE vehicles SET ${query} WHERE id = $${values.length + 1} RETURNING *`,
    [...values, id]
  );

  // console.log(data);
  return data;
}
async function deleteVehicle(id: number) {
  const data = await dbPool.query('DELETE FROM vehicles WHERE id = $1', [id]);
  return data;
}
async function checkVehicleBooking(id: number) {
  const bookings = await dbPool.query('SELECT * FROM vehicles WHERE id = $1', [
    id,
  ]);
  if (bookings.rows[0].status === 'booked') {
    return true;
  }
  return false;
}
export default {
  getVehicles,
  getVehicle,
  postVehicle,
  putVehicle,
  deleteVehicle,
  checkVehicleBooking,
};
