import express from 'express';
import auth from './auth';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Rent Vehicle API!');
});
router.use('/auth', auth);

export default router;
