import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

export const ProductModel = mongoose.model("Product", ProductSchema);
