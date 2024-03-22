import axios from 'axios';

const Mpesa = {
  initiatePayment: async (phoneNumber, amount) => {
    try {
      const response = await axios.post('https://cors-anywhere.herokuapp.com/https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        phoneNumber,
        amount,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to initiate M-Pesa payment');
    }
  },

  initiateSTKPush: async (phoneNumber, amount, transactionId) => {
    try {
      const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        BusinessShortCode: 174379,
        Password: 'MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwMzIyMTUxNjMy',
        Timestamp: '20240322151632',
        TransactionType: 'CustomerPayBillOnline',
        Amount: 1,
        PartyA: 254708374149,
        PartyB: '174379',
        PhoneNumber: 254708374149,
        CallBackURL: 'https://mydomain.com/path',
        AccountReference: 'JTC',
        TransactionDesc: 'product X',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.MPESA_ACCESS_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to initiate STK push');
    }
  },
};

export default Mpesa;
