"use client"
// MpesaPaymentForm.tsx

import React, { useState } from 'react';
import Mpesa from './mpesa';

interface MpesaPaymentFormProps {
  totalAmount: number; // Pass the total amount as props
}

const MpesaPaymentForm: React.FC<MpesaPaymentFormProps> = ({ totalAmount }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    setLoading(true);
    try {
      // Call Mpesa.initiatePayment with the total amount
      const paymentResponse = await Mpesa.initiatePayment(phoneNumber, totalAmount);
      // Handle payment response as needed
      console.log(paymentResponse);
      // Simulate notification to the user's phone
      alert(`A notification has been sent to ${phoneNumber}`);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">M-Pesa Payment</h2>
      <form onSubmit={handlePayment} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="py-2 px-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
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
