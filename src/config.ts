import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION: process.env.DB_CONNECTION,
};
