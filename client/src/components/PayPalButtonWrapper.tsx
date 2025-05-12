import React, { useEffect } from 'react';
import PayPalButton from '@/components/PayPalButton';

interface PayPalButtonWrapperProps {
  amount: string;
  currency: string;
  intent: string;
  orderId?: number;
  onPaymentComplete?: (paypalOrderId: string) => Promise<void>;
}

/**
 * Ein Wrapper um den PayPalButton, der es ermöglicht, Callback-Funktionen für Zahlungsereignisse zu registrieren
 * ohne den eigentlichen PayPalButton zu modifizieren.
 */
export function PayPalButtonWrapper({
  amount,
  currency,
  intent,
  orderId,
  onPaymentComplete
}: PayPalButtonWrapperProps) {
  
  // Initialisiere Event-Listener für PayPal-Ereignisse
  useEffect(() => {
    // Ursprüngliche onApprove-Funktion kommt von der PayPal-Komponente
    const originalOnApprove = window.onApproveHandler;
    
    // Wenn unsere PayPal-Komponente geladen ist, finden wir den paypal-button und fügen einen Interceptor hinzu
    const interceptPayPalEvents = () => {
      const paypalButtonEl = document.getElementById('paypal-button');
      
      if (!paypalButtonEl) return;
      
      // Speichere die ursprüngliche Click-Funktion
      const originalClick = paypalButtonEl.onclick;
      
      // Überschreibe mit unserem Interceptor
      paypalButtonEl.onclick = async (e) => {
        // Speichere die Bestell-ID für spätere Verwendung
        if (orderId) {
          localStorage.setItem('currentOrderId', orderId.toString());
        }
        
        // Rufe das ursprüngliche Click-Event auf
        if (originalClick) {
          originalClick.call(paypalButtonEl, e);
        }
      };
    };
    
    // MonkeyPatch für onApprove-Handler
    window.onApproveHandler = async (data: any) => {
      console.log("PayPal payment approved", data);
      
      // Original-Handler aufrufen
      if (originalOnApprove) {
        await originalOnApprove(data);
      }
      
      // Hole die gespeicherte Bestell-ID
      const storedOrderId = localStorage.getItem('currentOrderId');
      
      // Rufe unsere Callback-Funktion auf
      if (onPaymentComplete && data.orderId) {
        await onPaymentComplete(data.orderId);
        
        // Lösche die temporäre Bestell-ID
        localStorage.removeItem('currentOrderId');
        
        // Sende ein Event für die erfolgreiche Zahlung
        const paymentEvent = new CustomEvent('paypal-payment-complete', {
          detail: {
            paypalOrderId: data.orderId,
            babixOrderId: storedOrderId ? parseInt(storedOrderId) : undefined
          }
        });
        window.dispatchEvent(paymentEvent);
      }
    };
    
    // Führe die Interceptor-Funktion aus, wenn die Komponente gemountet wird
    setTimeout(interceptPayPalEvents, 1000);
    
    // Cleanup-Funktion
    return () => {
      // Stelle den ursprünglichen Handler wieder her
      window.onApproveHandler = originalOnApprove;
      localStorage.removeItem('currentOrderId');
    };
  }, [orderId, onPaymentComplete]);
  
  return (
    <PayPalButton
      amount={amount}
      currency={currency}
      intent={intent}
    />
  );
}

// Füge die globale Typdefinition hinzu
declare global {
  interface Window {
    onApproveHandler?: (data: any) => Promise<void>;
  }
}