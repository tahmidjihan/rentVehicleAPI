import express from 'express';
// import dotenv from 'dotenv';
import api from './api/index.js';
import envData from './config.js';
import initDB from './initDB.js';
// dotenv.config();

const app = express();
app.use(express.json());
const { PORT } = envData;
initDB();
// const PORT = process.env.PORT || 3000;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Welcome to the Rent Vehicle API!');
});
app.use('/api/v1', api);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
