const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    amount: Number,
    paymentDate: {
      type: Date,
      default: Date.now
    }
  });

  const Payment = mongoose.model('Payment', paymentSchema);

  module.exports = Payment