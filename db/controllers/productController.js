const Product = require('../models/productModel');
const productSave = async (req, res) => {
  const { name, price, description, category, subcategory, image } = req.body;
  const data = await Product.create({
    name,
    price,
    description,
    category,
    subcategory,
    image
  });
  res.send(data);
};


const getAllProducts = async (req, res) => {
  const data = await Product.find();
  res.send(data);
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, subcategory, image } = req.body;
  const data = await Product.findByIdAndUpdate(id, {
    name,
    price,
    description,
    category,
    subcategory,
    image
  });
  res.send(data);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const data = await Product.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: `Product ${id} deleted successfully`, data });
  
};

module.exports = { productSave, getAllProducts, editProduct ,deleteProduct};


 