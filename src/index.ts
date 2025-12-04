import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Welcome to the Rent Vehicle API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
