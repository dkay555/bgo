import { useState, useEffect } from 'react';
import { Sticker, calculatePrice } from '@/lib/stickerData';

const STORAGE_KEY = 'sticker-cart';

export interface StickerCartData {
  items: Sticker[];
  totalPrice: number;
}

export function useStickerCart() {
  const [cartItems, setCartItems] = useState<Sticker[]>([]);
  
  // Laden des Warenkorbs aus dem localStorage beim Initialisieren
  useEffect(() => {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Fehler beim Laden des Warenkorbs:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);
  
  // Speichern des Warenkorbs im localStorage, wenn sich der Inhalt ändert
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Berechnung des Gesamtpreises
  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => total + calculatePrice(item), 0);
  };
  
  // Hinzufügen eines Stickers zum Warenkorb
  const addToCart = (sticker: Sticker) => {
    setCartItems(prev => [...prev, sticker]);
  };
  
  // Entfernen eines Stickers aus dem Warenkorb
  const removeFromCart = (index: number) => {
    setCartItems(prev => {
      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
  };
  
  // Leeren des Warenkorbs
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(STORAGE_KEY);
  };
  
  return {
    cartItems,
    totalPrice: calculateTotal(),
    addToCart,
    removeFromCart,
    clearCart
  };
}