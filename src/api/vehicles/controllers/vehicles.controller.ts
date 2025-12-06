import { dbPool } from '../../../dbPool';
import express from 'express';
import type { Vehicle } from '../../../types/vehicle.d';
import type { UserResponse } from '../../../types/User';

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
  try {
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
  } catch (err) {
    console.log(err);
  }

  //   return data.rows;
  // return data.rows;
}

// vehicles PUT
export async function putVehicle(req: express.Request, res: express.Response) {
  const user = req?.user as UserResponse;
  if (user?.role !== 'admin') {
    res.status(401).send('Access denied');
  }
  const id = Number(req.params.id) as number;
  const vehicle: Vehicle = req.body;
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
  // return data.rows[0];
  res.send({
    status: 'success',
    message: 'Vehicle updated successfully',
    data: data.rows[0],
  });
}
export async function deleteVehicle(
  req: express.Request,
  res: express.Response
) {
  // const data = await dbPool.query('DELETE FROM vehicles WHERE id = $1', [id]);
  // return data.rows[0];
  const id = Number(req.params.id) as number;
  const bookings = await dbPool.query(
    'SELECT * FROM bookings WHERE vehicle_id = $1',
    [id]
  );
  if (bookings.rows.length > 0) {
    // res.status(401).send('Vehicle is in use');
    bookings.rows.forEach((booking) => {
      if (booking.status === 'booked') {
        res.status(401).send('Vehicle is in use');
      }
    });
  }
  const data = await dbPool.query('DELETE FROM vehicles WHERE id = $1', [id]);
  res.send({
    status: 'success',
    message: 'Vehicle deleted successfully',
    data: data.rows[0],
  });
}
