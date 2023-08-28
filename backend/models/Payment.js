

const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
      userId : {
        type: String,
        required: true
      },
      classId : {
        type: String,
        required: true
      },
      
      amount : {
        type: Number,
        required: true
      },
      status:{
        type: String,
        enum: ['pending', 'completed', 'refunded', 'withdrawn'],
        required: true
      }


});


const Payment = mongoose.model('Payment', PaymentSchema);



// Define associations if needed

module.exports = Payment;

