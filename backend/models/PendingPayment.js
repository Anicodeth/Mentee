
const mongoose = require('mongoose');

const PendingPaymentSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  classId: {
    type: String,
    required: true
  },
  amount:{
    type: String,
    required: true

  },
  status:{
    type: String,
    required: true
  }
});

const PendingPayment = mongoose.model('PendingPayment', PendingPaymentSchema);

module.exports = PendingPayment;

