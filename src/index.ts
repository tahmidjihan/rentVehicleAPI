import express from 'express';
import dotenv from 'dotenv';
import api from './api';
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Welcome to the Rent Vehicle API!');
});
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
