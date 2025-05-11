import React from 'react';
import { Sticker, calculatePrice } from '@/lib/stickerData';

interface StickerDetailProps {
  sticker: Sticker;
  onAddToCart: (sticker: Sticker) => void;
}

export default function StickerDetail({ sticker, onAddToCart }: StickerDetailProps) {
  const price = calculatePrice(sticker);
  
  // Render Sterne
  const renderStars = () => {
    return Array(sticker.stars).fill(0).map((_, index) => (
      <span key={index} className="material-icons text-yellow-500">star</span>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
      {sticker.isGold && (
        <div className="absolute -top-3 -right-3">
          <span className="material-icons text-yellow-500 text-3xl">workspace_premium</span>
        </div>
      )}
      
      <h3 className="text-xl font-bold text-[#0A3A68] mb-2">{sticker.name}</h3>
      
      <div className="flex items-center mb-2">
        <span className="mr-2">Sterne:</span>
        <div className="flex">{renderStars()}</div>
      </div>
      
      <div className="flex items-center mb-3">
        <span className="mr-2">Status:</span>
        <span className={`px-2 py-1 rounded text-sm ${sticker.isGold ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
          {sticker.isGold ? 'Gold' : 'Normal'}
        </span>
      </div>
      
      <div className="mb-3 font-bold text-lg">
        Preis: {price.toFixed(2).replace('.', ',')} €
      </div>
      
      {sticker.isGold && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-3 text-sm">
          Goldsticker können nur während des Goldtauschs versendet werden. Reserviere ihn per WhatsApp.
        </div>
      )}
      
      <button 
        onClick={() => onAddToCart(sticker)}
        disabled={sticker.isGold}
        className={`w-full py-2 px-4 rounded-md text-white font-bold ${
          sticker.isGold 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#0A3A68] hover:bg-[#00CFFF] hover:text-[#0A3A68] transition-colors'
        }`}
      >
        {sticker.isGold ? 'Nur über WhatsApp reservierbar' : 'Zum Warenkorb hinzufügen'}
      </button>
    </div>
  );
}