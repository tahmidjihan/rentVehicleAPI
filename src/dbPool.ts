import { Pool } from 'pg';
import config from './config';

export const dbPool = new Pool({
  connectionString: config.DB_CONNECTION,
});
