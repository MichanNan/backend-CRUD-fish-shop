// import { products } from "../../../lib/products";
import dbConnect from "../../../db/connect.js";
import Product from "../../../db/models/Product.js";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const products = await Product.find();
    response.status(200).json(products);
  }
  if (request.method === "POST") {
    try {
      const productData = request.body;
      const product = new Product(productData);
      await product.save();
      response.status(200).json({ message: "joke created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
