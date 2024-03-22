import axios from 'axios';

const Mpesa = {
  initiateSTKPush: async (phoneNumber, amount) => {
    try {
      const apiKey = 'YOUR_API_KEY';
      const apiSecret = 'YOUR_API_SECRET';
      const authHeader = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

      const response = await axios.post(
        '',
        {
          BusinessShortCode: 'YOUR_BUSINESS_SHORT_CODE',
          Password: 'YOUR_PASSWORD',
          Timestamp: 'YOUR_TIMESTAMP',
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: phoneNumber,
          PartyB: 'YOUR_BUSINESS_SHORT_CODE',
          PhoneNumber: phoneNumber,
          CallBackURL: 'YOUR_CALLBACK_URL',
          AccountReference: 'YOUR_ACCOUNT_REFERENCE',
          TransactionDesc: 'YOUR_TRANSACTION_DESCRIPTION',
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
