const Payment = require('../models/Payment')
const Order = require('../models/Order')
exports.getPayment =async (req,res)=>{
    const payments = await Payment.find()
    .populate({
    path: 'order',
    populate: {
    path: 'product buyer'
    }
    });
    res.json(payments);
}

exports.orderPayment = async (req,res)=>{
    const { orderId, amount } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
    return res.status(400).json({ message: 'Order not found.' });
    }
    const payment = new Payment({
    order: order._id,
    amount
    });
    try {
    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
}