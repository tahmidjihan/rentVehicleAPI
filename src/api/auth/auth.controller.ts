// import { signin, signup } from './auth.service';
import type { Credentials } from '../../types/User.js';
import express from 'express';
import service from './auth.service.js';

async function signup(req: express.Request, res: express.Response) {
  const user = await req.body.user;
  res.send(service.signup(user));
}
async function signin(req: express.Request, res: express.Response) {
  const credentials: Credentials = await req.body.credentials;
  // console.log(req.body);
  // res.send(signin(credentials));
  const result = await service.signin(credentials);
  if (result) {
    res.send(result);
  } else {
    res.status(401).send('Access denied');
  }
}
export default { signup, signin };
