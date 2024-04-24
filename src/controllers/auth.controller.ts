import { Request, Response } from 'express';
import { auth, random } from '../helpers';
import { createUser, getUserByEmail, getUserById } from '../models/users';
import jwt from 'jsonwebtoken';
import { envs } from '../config/envs.plugin';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    const user = await getUserByEmail(email).select(
      '+authentication.tokenJWT +authentication.password'
    );

    if (!user) return res.sendStatus(400);

    const expectedHash = auth(password);

    if (user.authentication.password !== expectedHash)
      return res.sendStatus(403);

    const tokenJWT = jwt.sign({ id: user._id }, envs.JWT_SECRET);

    user.authentication.tokenJWT = tokenJWT;

    await user.save();
    return res
      .status(200)
      .header('Authorization', `Bearer ${tokenJWT}`)
      .send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: tokenJWT,
        password: user.authentication.password,
      })
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).send('sign in error');
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) return res.sendStatus(400);
    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.sendStatus(400);

    const token = random();
    const user = await createUser({
      email,
      username,
      authentication: { token, password: auth(password) },
    });

    return res.status(201).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await getUserById(userId);
    if (!user) return res.sendStatus(404).json({ error: 'User not found' });

    const token = jwt.sign({ userId: user._id }, envs.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.setHeader('Authorization', `Bearer ${token}`);

    return res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ error: error.message });
  }
};
