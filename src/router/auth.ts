import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
export default (router: Router) => {
  router.post("/auth/register", registerUser);
  router.post("/auth/login", loginUser);
};
