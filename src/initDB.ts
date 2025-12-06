import { dbPool } from './dbPool';

function initDB() {
  dbPool.query(
    `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        role VARCHAR(10) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        registration_number VARCHAR(255) NOT NULL UNIQUE,
        daily_rent_price INT NOT NULL CHECK(daily_rent_price > 0),
        availability_status VARCHAR(255) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL CHECK(rent_end_date > rent_start_date),
        total_price INT NOT NULL CHECK(total_price > 0),
        status VARCHAR(255) NOT NULL
      );
    `
  );
}

// initDB();

export default initDB;
