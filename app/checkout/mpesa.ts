import axios from 'axios';

const Mpesa = {
  initiateSTKPush: async (phoneNumber, amount) => {
    try {
      const apiKey = 'AMPhSiRkUu4i7nAtGzDp51zW5jkf0XS0ikq6th90Ox5a6t8N';
      const apiSecret = 'xrVZqDsLTRNmqpv5RJ69s3BP5O95fV9A5EN6FYhAI7cZeiAIiea0QASHXcRcfrel';
      const authHeader = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

      const response = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        {
          BusinessShortCode: 174379,
          Password: "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwMzI2MTEzNzE2",
          Timestamp: '20240326113716',
          TransactionType: 'CustomerPayBillOnline',
          Amount: 1,
          PartyA: +254790817497,
          PartyB: 174379,
          PhoneNumber: +25490817497,
          CallBackURL: 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
          AccountReference: 'JTC',
          TransactionDesc: 'Payment',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${authHeader}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error('Failed to initiate Mpesa payment');
    }
  },
};

export default Mpesa;
