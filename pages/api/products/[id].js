// import { products } from "../../../lib/products";
import dbConnect from "../../../db/connect.js";
import Product from "../../../db/models/Product.js";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const product = await Product.findById(id).populate("reviews");
    if (!product) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(product);
    return;
  }

  if (request.method === "PUT") {
    const productEditData = request.body;
    await Product.findByIdAndUpdate(id, { $set: request.body });
    response.status(200).json({ status: "Product successfully updated" });
    return;
  }

  if (request.method === "DELETE") {
    await Product.findByIdAndDelete(id);
    response.status(200).json({ status: "Product deleted" });
    return;
  }
}
