import {localIp} from "../constants";


export async function makePayment(paymentDetail) {
  return await fetch(`${localIp}/payment/make-payment`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    },
      body: JSON.stringify(paymentDetail)
      });
}