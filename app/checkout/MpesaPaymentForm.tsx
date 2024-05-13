import React, { useState } from 'react';
import axios from 'axios';
import { formatPrice } from '@/utils/formatPrice';

const USD_TO_KES_EXCHANGE_RATE = 110;

interface MpesaPaymentFormProps {
  totalAmount: number;
}

const MpesaPaymentForm: React.FC<MpesaPaymentFormProps> = ({ totalAmount }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const totalAmountKES = totalAmount * USD_TO_KES_EXCHANGE_RATE;
  const formattedPriceKES = formatPrice(totalAmountKES);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setLoading(true);
    try {
      const response = await axios.post(
        '/mpesa/stkpush/v1/processrequest',
        {
          phoneNumber: phoneNumber,
          amount: totalAmountKES,
          callbackUrl: 'https://mydomain.com/path',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(response.data);
      alert(`A notification has been sent to ${phoneNumber}`);
    } catch (error) {
      setPaymentError('Failed to initiate Mpesa payment');
    }
    setLoading(false);
  };
  

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <img src="/mpesalogo.png" alt="M-Pesa Logo" className="w-15 mx-auto mb-6" />
      <div className="mb-4">
        <p className="text-lg font-semibold">Total Amount: {formattedPriceKES}</p>
      </div>
      <form onSubmit={handlePayment} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            pattern="[0-9]{10}"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="py-2 px-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {paymentError && <p className="text-red-500">{paymentError}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 py-2 px-4 text-white font-semibold rounded-md transition duration-300 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Pay with M-Pesa'}
        </button>
      </form>
    </div>
  );
};

export default MpesaPaymentForm;
