import express from 'express';
import type { UserResponse } from '../../../types/User.js';
// import type { Vehicle } from '../../../types/vehicle';
import services from '../services/bookings.service.js';
import adminServices from '../services/bookings.admin.service.js';

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

  res.send(await adminServices.getBookings());
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
async function putBooking(req: express.Request, res: express.Response) {
  const { status } = req.body;
  const bookingId = req.params.bookingId;
  const user = req?.user as UserResponse;
  // console.log(bookingId);
  // console.log(user.role);
  if (user.role !== 'admin') {
    if (status == 'cancelled') {
      try {
        const data = await services.checkUser(
          Number(bookingId),
          Number(user.id)
        );
        if (data.success === false) {
          return res.status(403).send('Forbidden');
        }
        const dataUpdate = await services.putBooking(Number(bookingId), status);
        if (dataUpdate) {
          // ? have to make more changes according documentation
          // TODO I have to remove few things from the response
          const result = {
            success: true,
            message: 'Booking cancelled successfully now',
            data: { ...dataUpdate.rows[0], status: 'cancelled' },
          };
          res.send(result);
          return result;
        }
      } catch (err) {
        console.log(err);
        res.send({
          success: false,
          message: 'Error',
          error: err,
        });
        return 'error';
      }
    }
  }
  try {
    // console.log(bookingId);
    const dataUpdate = await adminServices.putBooking(
      status,
      Number(bookingId)
    );
    if (dataUpdate) {
      // ? have to make more changes according documentation
      // TODO I have to remove few things from the response
      const result = {
        success: true,
        message: 'Booking cancelled successfully now',
        data: { ...dataUpdate.rows[0] },
      };
      res.send(result);
      return result;
    }
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: 'Error',
      error: error,
    });
  }
}
export default { getBookings, addBooking, putBooking };
