import { dbPool } from '../../dbPool';
import type { Vehicle } from '../../types/vehicle';

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
async function putVehicle(id: number, vehicle: Vehicle) {
  const data = await dbPool.query(
    'UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 WHERE id = $6 RETURNING *',
    [
      vehicle.vehicle_name,
      vehicle.type,
      vehicle.registration_number,
      vehicle.daily_rent_price,
      vehicle.availability_status,
      id,
    ]
  );
  return data;
}
export default {
  getVehicles,
  getVehicle,
  postVehicle,
  putVehicle,
};
