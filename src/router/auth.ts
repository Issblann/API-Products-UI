import { Router } from 'express';
import {
  loginUser,
  registerUser,
  getUserByIdController,
} from '../controllers/auth.controller';

export default (router: Router) => {
  router.post('/auth/register', registerUser);
  router.post('/auth/login', loginUser);
  router.get('/api/user/:id', getUserByIdController);
};
