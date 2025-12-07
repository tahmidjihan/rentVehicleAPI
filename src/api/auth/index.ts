import express from 'express';
import controller from './auth.controller';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Auth API!');
});
router.post('/signup', controller.signup);
router.post('/signin', controller.signin);
export default router;
