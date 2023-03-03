const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    quantity: Number
  });

  const Order = mongoose.model('Order', orderSchema);

  module.exports = Order