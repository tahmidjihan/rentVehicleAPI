import express from 'express';
import auth from '../auth/auth.middleware';
const router = express.Router();

router.get('/', auth, (req, res) => {
  console.log(req.user);
  res.send('Welcome to the Vehicles API!');
});
router.post('/', auth, (req, res) => {
  const user = req.user;
  if (user?.role !== 'admin') {
    res.status(401).send('Access denied');
    return;
  }
  res.send('Welcome to the Vehicles API!');
});
export default router;
