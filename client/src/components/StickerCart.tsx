import React from 'react';
import { Sticker, calculatePrice } from '@/lib/stickerData';
import { CONTACT } from '@/lib/constants';

interface StickerCartProps {
  cartItems: Sticker[];
  onRemoveFromCart: (sticker: Sticker) => void;
  onCheckout: () => void;
}

export default function StickerCart({ cartItems, onRemoveFromCart, onCheckout }: StickerCartProps) {
  const totalPrice = cartItems.reduce((sum, item) => sum + calculatePrice(item), 0);
  
  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <p className="text-gray-600 text-center">Dein Warenkorb ist leer</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-4">
      <h3 className="text-xl font-bold text-[#0A3A68] mb-4">Dein Warenkorb</h3>
      
      <div className="overflow-y-auto max-h-[300px] mb-4">
        {cartItems.map((item) => (
          <div 
            key={item.id} 
            className={`flex justify-between items-center py-2 px-3 mb-2 rounded ${
              item.isGold ? 'bg-red-50 border border-red-200' : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-600">
                {item.stars} Sterne • {calculatePrice(item).toFixed(2).replace('.', ',')} €
              </div>
            </div>
            <button 
              onClick={() => onRemoveFromCart(item)} 
              className="text-red-500 hover:text-red-700"
            >
              <span className="material-icons">delete</span>
            </button>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-3 mb-4">
        <div className="flex justify-between font-bold">
          <span>Gesamtpreis:</span>
          <span>{totalPrice.toFixed(2).replace('.', ',')} €</span>
        </div>
      </div>
      
      <button 
        onClick={onCheckout}
        disabled={cartItems.length === 0}
        className="w-full py-2 px-4 rounded-md bg-[#FF4C00] text-white font-bold hover:bg-[#0A3A68] transition-colors"
      >
        Jetzt kaufen
      </button>
    </div>
  );
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Sticker[];
}

export function CheckoutModal({ isOpen, onClose, cartItems }: CheckoutModalProps) {
  if (!isOpen) return null;
  
  const totalPrice = cartItems.reduce((sum, item) => sum + calculatePrice(item), 0);
  const itemsList = cartItems.map(item => `${item.name} (${item.stars}★) - ${calculatePrice(item).toFixed(2).replace('.', ',')}€`).join(", ");
  
  const whatsappMessage = encodeURIComponent(
    `Hallo, ich möchte folgende Sticker kaufen: ${itemsList}. Gesamtpreis: ${totalPrice.toFixed(2).replace('.', ',')}€`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-[#0A3A68] mb-4">Bestätigung</h3>
        
        <p className="mb-4">
          Deine Bestellung umfasst {cartItems.length} Sticker mit einem Gesamtwert von {totalPrice.toFixed(2).replace('.', ',')}€.
        </p>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
          <a 
            href={`${CONTACT.whatsapp}&text=${whatsappMessage}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-2 px-4 rounded-md bg-green-500 text-white font-bold text-center flex items-center justify-center"
          >
            <span className="material-icons mr-2">whatsapp</span>
            Via WhatsApp bestellen
          </a>
          
          <a 
            href={CONTACT.facebook} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-2 px-4 rounded-md bg-blue-500 text-white font-bold text-center flex items-center justify-center"
          >
            <span className="material-icons mr-2">forum</span>
            Via Facebook bestellen
          </a>
          
          <a 
            href="/kontakt" 
            className="w-full py-2 px-4 rounded-md bg-gray-200 text-gray-800 font-bold text-center flex items-center justify-center"
          >
            <span className="material-icons mr-2">email</span>
            Zum Kontaktformular
          </a>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full py-2 px-4 rounded-md bg-gray-300 text-gray-800 font-bold hover:bg-gray-400 transition-colors"
        >
          Zurück zum Shop
        </button>
      </div>
    </div>
  );
}