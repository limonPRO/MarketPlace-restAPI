const Order = require('../models/Order')
const Product = require('../models/Product')
exports.getOrders = async(req,res)=>{
    const orders = await Order.find()
    .populate('product')
    .populate('buyer');
    res.json(orders);
}

exports.makeOrders=async(req,res)=>{
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
    return res.status(400).json({ message: 'Product not found.' });
    }
    const order = new Order({
    product: product._id,
    buyer: req.userData.userId,
    quantity
   });
   try {
   const savedOrder = await order.save();
   res.status(201).json(savedOrder);
   } catch (err) {
   res.status(400).json({ message: err.message });
  }
}