import { Router } from "express";
import auth from "./auth";
import products from "./products";
const router = Router();

export default (): Router => {
  auth(router);
  products(router);
  return router;
};
