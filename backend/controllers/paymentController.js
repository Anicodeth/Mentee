// controllers/paymentController.js
const Payment= require('../models/Payment'); 
const PendingPayment = require('../models/PendingPayment');
const classService = require("../services/classService");
const axios = require('axios');
const enrollmentService = require('../services/enrollmentService');
CHAPA_AUTH = "CHASECK_TEST-c2wIJNJVQxlKy0Xigv9duKvqXmMQj7YD";
const config = {
    headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`
    }
}

const api = 'http://localhost:5000/';
const chapaApi = "https://api.chapa.co/v1/";




//////// initiate payment method
const initiatePayment = async (req, res) => {
  const {classId, amount, email, first_name, last_name, phone_number, returnUrl} = req.body;
  const userId = req.user.userId; // Assuming you're correctly getting the user ID

  const textRef = `${userId}-${classId}-${Date.now()}`;
  const data = {
    "amount": amount,
    "currency": "ETB",
    "email": email,
    "tx_ref": textRef,
    "callback_url": api + "payment/verify-payment/" + textRef,
    "return_url": returnUrl,
    "first_name": first_name,
    "last_name": last_name,
    "phone_number": phone_number,
  };
  // Make a request to the Chapa API to initiate payment
  await axios.post(chapaApi + "transaction/initialize", data, config).then((response) => {

    console.log("the chapa respponseee");
    console.log(response)
    // Create a payment record
    Payment.create({
      userId, // Make sure you are passing the user ID
      classId,
      amount,
      status: 'pending',
    });
    //return the checkout url
    res.send({ url: response.data.data.checkout_url, textRef: textRef });

    
    }).catch((err) => {
      console.log(err.response.data);
      res.status(500).json({ error: 'Error initiating payment' });
    });

};
/// Verify payment callback
const handlePaymentCallback = async (req, res) => {
  try {
    console.log('Payment callback called');
    const userid = req.params.id.split('-')[0];
    const classid = req.params.id.split('-')[1];
    console.log(`the text ref ${req.params.id}`)
    console.log(userid)
    console.log(classid)
    
    // Use Chapa API to verify the payment status
    const verificationResponse = await axios.get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, config);

    if (verificationResponse.data.data.status === 'success') {
      // Payment is successful, update the payment record in your database

      const payment = await Payment.findOne(
        {
          userId:userid,
          classId:classid,
          status: 'pending', // Ensure it's still in pending status to avoid double updates
        },
      );
      console.log(payment);

      if (payment) {
        // Update the payment status to 'completed'

        await payment.updateOne(
            {
              userId:userid,
              classId:classid,
              status: 'pending', // Ensure it's still in pending status to avoid double updates
            },
            {
            $set: { status: 'completed' }
            }
        );

        // Enroll the user in the class
        await enrollmentService.enrollUserInClass(userid, classid);

        
        console.log("Payment record updated to 'completed'");
        res.status(200).json({ message: 'Payment was successfully verified' });
      } else {
        console.log("Payment record not found or already completed");
        res.status(400).json({ error: 'Payment record not found or already completed' });
      }
    } else {
      console.log("Payment verification failed");
      res.status(400).json({ error: 'Payment verification failed' });
    }
  } catch (error) {
    console.log("Error handling payment callback:", error);
    res.status(500).json({ error: 'Error handling payment callback' });
  }
};


// handling withdrawal
const handlePaymentWithdraw = async (req, res) => {
  try {
    const { classId, account_number, account_name, bank_code } = req.body;
    const userId = req.user.userId;

    // Check if the class schedule has already passed
    const currentClass = await classService.getClassById(classId);
    if (!currentClass) {
      return res.status(400).json({ error: 'Class not found' });
    }

    const classEndTime = new Date(currentClass.schedule);
    const currentTime = new Date();
    
    // Check if the current time is after the class has ended
    if (currentTime < classEndTime) {
      return res.status(400).json({ error: 'Class has not ended yet' });
    }

    // Check if payments have been made for the class
    const payments = await Payment.findAll({
      where: {
        classId,
        status: 'completed',
      },
    });

    if (!payments.length) {
      return res.status(400).json({ error: 'No completed payments found for this class' });
    }

    // Calculate the total payment amount
    const totalAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);

    const raw_data = {
      "account_name": account_name,
      "account_number": account_number,
      "bank_code": bank_code,
      "amount": totalAmount,
      "currency": "ETB",
      "reference": `${userId}-${classId}-${Date.now()}`,
    };

    // Initiate a money transfer using the Chapa API
    const transferResponse = await axios.post('https://api.chapa.co/v1/transfer', raw_data, config);

    if (transferResponse.data.status === 'success') {
      // update the database
      await Payment.update({ status: 'withdrawn' }, {
        where: {
          classId,
          status: 'completed',
        },
      });

      res.status(200).json({ message: 'Withdrawal request successful' });
    } else {
      // Money transfer failed
      res.status(500).json({ error: 'Withdrawal request failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing withdrawal request' });
  }
};






module.exports = {
    initiatePayment,
    handlePaymentCallback,
    handlePaymentWithdraw
}