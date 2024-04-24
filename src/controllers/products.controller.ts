import { Request, Response } from "express";
import axios from "axios";
import { ProductModel } from "../models/products";

interface ProductModel {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}
type Product = {
  id: number;
  products: ProductModel[];
};

export const getAllProducts = async (req: Request, res: Response) => {
  let allProducts: any = [];

  const { data } = await axios.get("https://dummyjson.com/carts");

  data.carts.map((product: Product) => {
    const products = product.products;
    allProducts.push(...products);
  });
  allProducts.sort((a: ProductModel, b: ProductModel) => a?.id - b?.id);
  console.log(allProducts);
  await ProductModel.insertMany(allProducts);
  try {
    return res.status(200).json(allProducts);
  } catch (error) {
    return res.sendStatus(400);
  }
};
