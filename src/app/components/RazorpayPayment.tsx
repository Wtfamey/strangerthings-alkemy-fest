import React, { useState } from 'react';

interface RazorpayPaymentProps {
  amount: number;
  eventName: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (error: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function RazorpayPayment({ amount, eventName, onSuccess, onFailure }: RazorpayPaymentProps) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        onFailure(new Error('Failed to load Razorpay SDK'));
        setLoading(false);
        return;
      }

      // Create Razorpay order (you'll need to implement this API endpoint)
      const orderResponse = await fetch('/api/payments/create-order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount * 100, // Razorpay expects amount in paise
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            event_name: eventName,
          }
        })
      });

      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        onFailure(new Error(orderData.message));
        setLoading(false);
        return;
      }

      // Initialize Razorpay
      const options = {
        key: 'rzp_test_YOUR_KEY_ID', // Replace with your Razorpay key
        amount: amount * 100,
        currency: 'INR',
        name: 'Stranger Things Events',
        description: `Payment for ${eventName}`,
        order_id: orderData.order_id,
        handler: function (response: any) {
          // Payment successful
          onSuccess(response.razorpay_payment_id);
        },
        prefill: {
          name: 'User Name', // You can get this from user context
          email: 'user@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#dc2626' // Red color to match your theme
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      onFailure(error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Processing...' : `Pay ₹${amount}`}
    </button>
  );
}

export default RazorpayPayment;
