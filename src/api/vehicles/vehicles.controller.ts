import express from 'express';
import type { Vehicle } from '../../types/vehicle.js';
import type { UserResponse } from '../../types/User.js';
import services from './vehicles.service.js';
// vehicles GET
async function getVehicles(req: express.Request, res: express.Response) {
  const data = await services.getVehicles();
  if (data.rows.length === 0) {
    res.send({
      success: true,
      message: 'No vehicles found',
      data: [],
    });
    return;
  }
  const result = {
    success: true,
    message: 'Vehicles retrieved successfully',
    data: data.rows,
  };

  res.send(result);
}
// vehicle GET
async function getVehicle(req: express.Request, res: express.Response) {
  const id = Number(req.params.vehicleId) as number;
  const data = await services.getVehicle(id);
  const result = {
    status: 'success',
    message: 'Vehicle retrieved successfully',
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
  const vehicle = req.body;
  try {
    const data = await services.postVehicle(vehicle);
    const result = {
      success: true,
      message: 'Vehicle created successfully',
      data: data.rows[0],
    };
    res.status(201).send(result);
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
  const id = Number(req.params.vehicleId) as number;
  const vehicle = req.body;
  try {
    const data = await services.putVehicle(id, vehicle);
    res.send({
      success: true,
      message: 'Vehicle updated successfully',
      data: data.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
}
export async function deleteVehicle(
  req: express.Request,
  res: express.Response
) {
  const id = Number(req.params.vehicleId) as number;
  const isBooked = await services.checkVehicleBooking(id);
  if (isBooked) {
    return res
      .status(400)
      .send({ status: 'error', message: 'Vehicle is currently booked' });
  }
  const data = await services.deleteVehicle(id);

  res.send({
    success: true,
    message: 'Vehicle deleted successfully',
  });
}
export default {
  getVehicles,
  getVehicle,
  postVehicle,
  putVehicle,
  deleteVehicle,
};
