import { dbPool } from '../../../dbPool';
import type { Vehicle } from '../vehicle';

// vehicles GET
export async function getVehicles() {
  const data = await dbPool.query('SELECT * FROM vehicles');
  // console.log(data);
  return data.rows;
}
export async function getVehicle(id: number) {
  const data = await dbPool.query('SELECT * FROM vehicles WHERE id = $1', [id]);
  return data.rows[0];
}
// vehicles POST
export async function postVehicle(vehicle: Vehicle) {
  const data = await dbPool.query(
    'INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [
      vehicle.vehicle_name,
      vehicle.type,
      vehicle.registration_number,
      vehicle.daily_rent_price,
      vehicle.availability_status,
    ]
  );
  console.log(data);
  return data.rows[0];
  //   return data.rows;
  // return data.rows;
}
