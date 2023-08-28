
const Payment = require('../models/Payment');
const PendingPayment = require('../models/PendingPayment');


savePayment = async (payment) => {
    try
    {
        const savedPayment = await Payment.create(payment);
        return savedPayment;

    } catch (error) {
        throw new Error('Failed to save payment');
    }
}

savePendingPayment = async (pendingPayment) => {
    try{
        const savedPendingPayment = await PendingPayment.create(pendingPayment);
        return savedPendingPayment;
    }
    catch(error){
        throw new Error('Failed to save pending payment');
    }
}





module.exports ={
    savePayment,
    savePendingPayment
}