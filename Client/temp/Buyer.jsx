import React, { useState } from 'react';

const PurchaseService = () => {
  const [isPurchased, setIsPurchased] = useState(false);

  const handlePurchase = () => {
    // Assume this function would handle the purchase logic, e.g., calling an API
    // For simplicity, we'll just set isPurchased to true after a timeout
    setTimeout(() => {
      setIsPurchased(true);
    }, 2000); // Simulating a 2-second delay
  };

  return (
    <div>
      {!isPurchased ? (
        <div>
          <h2>Service Purchase</h2>
          <button onClick={handlePurchase}>Purchase</button>
        </div>
      ) : (
        <div>
          <h2>Thank you for your purchase!</h2>
          <p>Your service has been successfully purchased.</p>
        </div>
      )}
    </div>
  );
};

export default PurchaseService;
