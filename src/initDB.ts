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
    `
  );
}

// initDB();

export default initDB;
