import express from 'express';
import type { Vehicle } from '../../types/vehicle.js';
import type { UserResponse } from '../../types/User.js';
import services from './vehicles.service.js';
// vehicles GET
async function getVehicles(req: express.Request, res: express.Response) {
  const data = await services.getVehicles();
  const result = {
    status: 'success',
    message: 'Vehicles fetched successfully',
    data: data.rows,
  };

  res.send(result);
}
// vehicle GET
async function getVehicle(req: express.Request, res: express.Response) {
  const id = Number(req.params.id) as number;
  const data = await services.getVehicle(id);
  const result = {
    status: 'success',
    message: 'Vehicle fetched successfully',
    data: data.rows[0],
  };
  res.send(result);
}
// vehicles POST
async function postVehicle(req: express.Request, res: express.Response) {
  const user = req.user;
  if (user?.role !== 'admin') {
    res.status(401).send('Access denied');
  }
  const vehicle = req.body.vehicle;
  try {
    const data = await services.postVehicle(vehicle);
    const result = {
      status: 'success',
      message: 'Vehicle added successfully',
      data: data.rows[0],
    };
    res.send(result);
  } catch (err) {
    console.log(err);
  }
}

// vehicles PUT
async function putVehicle(req: express.Request, res: express.Response) {
  const user = req?.user as UserResponse;
  if (user?.role !== 'admin') {
    res.status(401).send('Access denied');
  }
  const id = Number(req.params.id) as number;
  const vehicle: Vehicle = req.body;
  const data = await services.putVehicle(id, vehicle);
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
  const id = Number(req.params.id) as number;
  const isBooked = await services.checkVehicleBooking(id);
  if (isBooked) {
    return res
      .status(400)
      .send({ status: 'error', message: 'Vehicle is currently booked' });
  }
  const data = await services.deleteVehicle(id);
  res.send({
    status: 'success',
    message: 'Vehicle deleted successfully',
    data: data.rows[0],
  });
}
export default {
  getVehicles,
  getVehicle,
  postVehicle,
  putVehicle,
  deleteVehicle,
};
