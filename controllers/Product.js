const Product = require('../models/Product')

exports.getProducts=async(req,res)=>{
    const products = await Product.find().populate('seller');
    res.json(products);
}

exports.postProducts=async(req,res)=>{
    const { name, price } = req.body;
const product = new Product({
name,
price,
seller: req.userData.userId
});
try {
const savedProduct = await product.save();
res.status(201).json(savedProduct);
} catch (err) {
res.status(400).json({ message: err.message });
}
}


