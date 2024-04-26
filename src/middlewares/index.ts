import { envs } from '../config/envs.plugin';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const SECRET_KEY = envs.JWT_SECRET;

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const token = req.cookies['access_token'];

  if (!token) {
    return res.status(401).json({ message: `Authorization cookie missing` });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.body.accessToken = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: `Invalid or expired token` });
  }
};
