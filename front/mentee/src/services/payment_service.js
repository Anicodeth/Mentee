import {localIp} from "../constants";


export async function makePayment(paymentDetail) {
    console.log(paymentDetail);
  const response =  await fetch(`${localIp}/payment/make-payment`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
    },
      body: JSON.stringify(paymentDetail)
      });

  if(response.status === 200){
      return response.json();
    }else {
      throw new Error("Payment failed");
  }
}

export async function withdrawPayment(classId){
    const response =  await fetch(`${localIp}/payment/withdraw-payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify({classId})
    });

    if(response.status === 200){
        return response.json();
    }else {
        throw new Error("Payment failed");
    }
}