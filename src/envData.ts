import dotenv from 'dotenv';

dotenv.config();

export const envData = {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION: process.env.DB_CONNECTION,
};
