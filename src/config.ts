import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION: process.env.DB_CONNECTION as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};
