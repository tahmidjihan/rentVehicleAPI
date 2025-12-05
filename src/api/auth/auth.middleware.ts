import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';

function verifyToken(token: string) {
  return jwt.verify(token, config.JWT_SECRET);
}
function decodeToken(token: string) {
  return jwt.decode(token);
}
export default function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const verified = verifyToken(token as string);
    if (verified) {
      const decoded = decodeToken(token as string);
      req.user = decoded as jwt.JwtPayload;
      next();
    }
  }
}
