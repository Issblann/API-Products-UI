import { Request, Response } from 'express';
import axios from 'axios';
import { ProductModel } from '../models/products';

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
  const { data } = await axios.get('https://dummyjson.com/carts');

  const allProducts = data.carts.flatMap(
    (product: Product) => product.products
  );

  const uniqueProducts = allProducts.reduce(
    (acc: ProductModel[], current: ProductModel) => {
      const isDuplicate = acc.find((product) => product.id === current.id);
      return isDuplicate ? acc : acc.concat([current]);
    },
    []
  );

  uniqueProducts.sort((a: ProductModel, b: ProductModel) => a.id - b.id);

  const page = parseInt(req.query.page as string);
  const pageSize = parseInt(req.query.pageSize as string);

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const paginatedProducts = uniqueProducts.slice(startIndex, endIndex);
  // const totalPages = Math.ceil(uniqueProducts.length / pageSize);

  await ProductModel.insertMany(paginatedProducts);
  try {
    return res.status(200).json(paginatedProducts);
  } catch (error) {
    return res.sendStatus(400);
  }
};
