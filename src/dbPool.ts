import { Pool } from 'pg';
import config from './config.js';

export const dbPool = new Pool({
  connectionString: config.DB_CONNECTION,
});
