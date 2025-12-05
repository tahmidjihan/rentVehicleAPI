import express from 'express';
import { signin, signup } from './auth.controller';
import type { Credentials } from './User';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Auth API!');
});
router.post('/signup', async (req: express.Request, res: express.Response) => {
  const user = await req.body.user;
  res.send(signup(user));
});
router.post('/signin', async (req: express.Request, res: express.Response) => {
  const credentials: Credentials = await req.body.credentials;
  // console.log(req.body);
  // res.send(signin(credentials));
  const result = await signin(credentials);
  if (result) {
    res.send(result);
  } else {
    res.status(401).send('Access denied');
  }
});
export default router;
