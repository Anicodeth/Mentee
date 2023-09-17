import {localIp} from "../constants";


export async function makePayment(paymentDetail) {
  const response =  await fetch(`${localIp}/payment/make-payment`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    },
      body: JSON.stringify(paymentDetail)
      });

  if(response.status === 200){
      return response.json();
    }else {
      throw new Error("Payment failed");
  }
}