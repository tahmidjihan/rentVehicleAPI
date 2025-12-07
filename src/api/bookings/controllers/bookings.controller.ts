import express from 'express';
import { dbPool } from '../../../dbPool';
import type { UserResponse } from '../../../types/User';
import type { Vehicle } from '../../../types/vehicle';
import services from '../services/bookings.service';

// bookings GET
async function getBookings(req: express.Request, res: express.Response) {
  const user = req?.user as UserResponse;
  if (user?.role !== 'admin') {
    const userId = user?.id;
    const data = await services.getBookings(userId);
    const result = {
      success: true,
      message: 'Bookings fetched successfully',
      data: data.rows,
    };
    res.send(result);
  }
  // ? here admin logic should go
  // const data = await services.getBookings();
  const result = {
    success: true,
    message: 'Bookings fetched successfully',
    // data: data.rows,
  };
  res.send(result);
}

async function addBooking(req: express.Request, res: express.Response) {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

  const vehicle = await services.isBooked(vehicle_id);
  if (vehicle.success === false) {
    res.send({
      success: false,
      message: 'Error : Vehicle is currently booked',
      error: vehicle.message,
    });
  }
  const times = {
    start: new Date(rent_start_date).getTime() / 1000 / 60 ** 2 / 24,
    end: new Date(rent_end_date).getTime() / 1000 / 60 ** 2 / 24,
  };
  const daily_rent_price = await vehicle.data.daily_rent_price;
  const totalPrice = (times.end - times.start) * Number(daily_rent_price);
  // console.log(vehicle);
  const wholeData = {
    customer_id,
    vehicle_id,
    start_date: new Date(rent_start_date).toISOString(),
    end_date: new Date(rent_end_date).toISOString(),
    total_price: totalPrice,
    status: 'booked',
  };
  // console.log(wholeData);
  const data = await services.addBooking(wholeData);
  // const data = { totalPrice };
  if (data) {
    res.send({
      success: true,
      message: 'Booking added successfully',
      // data: data.rows[0],
    });
    return;
  }
}
async function putBooking(req: express.Request) {
  const { status } = req.body;
  const id = req.params.id;
  const user = req?.user as UserResponse;
  if (status == 'cancelled') {
    // console.log('passed 1st layer');
    try {
      const data = await dbPool.query('SELECT * FROM bookings WHERE id = $1', [
        id,
      ]);
      if (data.rows[0].customer_id !== user.id) {
        console.log('forbade');
        return 'Forbidden';
      }
      console.log(data.rows[0].customer_id);
      console.log(user.id + 'is the real one');
      console.log('granted');
      const dataUpdate = await dbPool.query(
        'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
      const updateVehicle = await dbPool.query(
        'UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING *',
        ['returned', id]
      );
      if (dataUpdate && updateVehicle) {
        const data = await dbPool.query(
          'SELECT * FROM bookings WHERE id = $1',
          [id]
        );
        // ? have to make more changes according documentation
        // TODO I have to remove few things from the response
        const result = {
          success: true,
          message: 'Booking cancelled successfully now',
          data: { ...data.rows[0], status: 'cancelled' },
        };
        return result;
      }
    } catch (err) {
      console.log(err);
      return 'error';
    }
  }
}
export default { getBookings, addBooking, putBooking };
