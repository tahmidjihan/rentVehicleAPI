import express from 'express';
import { signin, signup } from './auth.controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Auth API!');
});
router.post('/signup', (req: express.Request, res: express.Response) => {
  const user = req.body.user;
  res.send(signup(user));
});
router.post('/signin', (req: express.Request, res: express.Response) => {
  const credentials = req.body.credentials;
  res.send(signin(credentials));
});
export default router;
