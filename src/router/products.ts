import { Router } from "express";
import { getAllProducts } from "../controllers/products.controller";
import { isAuthenticated } from "../middlewares";
export default (router: Router) => {
  router.get("/api/products", isAuthenticated, getAllProducts);
};
