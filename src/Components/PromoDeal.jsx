import { useState } from 'react';

export default function PromoDeal() {

  const productName = "MechKey Pro Custom Keyboard";
  const features = ["Tactile Switches", "Hot-swappable", "Per-key RGB"];
  const promoDetails = { 
    code: "FORGE20", 
    discountPercent: 0.20
  };

  const [price, setPrice] = useState(149.99);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [systemMessage, setSystemMessage] = useState("Click the button below to reveal today's special deal!");


  const applyPromoCode = () => {

    if (!isPromoApplied) {
      const discountAmount = price * promoDetails.discountPercent;
      const newPrice = price - discountAmount;
      

      setPrice(newPrice);
      setIsPromoApplied(true);
      setSystemMessage(`🎉 Success! System applied code ${promoDetails.code} for 20% off.`);
    }
  };
  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
      

      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
        Featured Deal: {productName}
      </h2>
      
      
      <ul className="flex gap-2 mb-6 text-sm text-blue-600 dark:text-blue-400 font-medium">
        {features.map((feature, index) => (
          <li key={index} className="bg-blue-50 dark:bg-gray-900 px-3 py-1 rounded-full">
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex items-end gap-4 mb-6">
        
        <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
          ${price.toFixed(2)}
        </span>
        
        
        {isPromoApplied && (
          <span className="text-sm font-bold text-green-500 bg-green-100 dark:bg-green-900 px-2 py-1 rounded mb-1">
            Discount Applied!
          </span>
        )}
      </div>

    
      <p className={`mb-6 p-4 rounded-xl text-sm font-medium ${isPromoApplied ? 'bg-green-50 dark:bg-gray-900 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400'}`}>
        {systemMessage}
      </p>


      <button 
        onClick={applyPromoCode} 
        disabled={isPromoApplied}
        className="w-full py-3 px-6 text-white font-bold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-md"
      >
        {isPromoApplied ? 'Promo Claimed' : 'Reveal & Apply Discount'}
      </button>

    </div>
  );
}