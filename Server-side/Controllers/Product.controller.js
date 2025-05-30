import productModel from '../models/products.js';

export const GetProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const CreateProduct = async (req, res) => {
  const { name, price, imageurl } = req.body;
  if (!name || !price || !imageurl) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  try {
    const newProduct = await productModel.create({ name, price, imageurl });
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await productModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Product not found' });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
