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
 * Ein einfacher Wrapper um den PayPalButton, der es ermöglicht, die Bestellung zu verfolgen
 * und nach erfolgreicher Zahlung zu aktualisieren.
 */
export function PayPalButtonWrapper({
  amount,
  currency,
  intent,
  orderId,
  onPaymentComplete
}: PayPalButtonWrapperProps) {

  // Speichere Bestellungs-ID und registriere Event-Listener
  useEffect(() => {
    // Wenn eine Bestellungs-ID vorhanden ist, speichere sie für den PayPal-Callback
    if (orderId) {
      localStorage.setItem('currentOrderId', orderId.toString());
    }

    // Event-Listener für erfolgreiche Zahlungen
    const handlePaymentSuccess = async (event: any) => {
      console.log("PayPal Zahlung erfolgreich", event);

      // Bestell-ID und PayPal-Transaktions-ID extrahieren
      const paypalOrderId = event.detail?.paypalOrderId;

      if (paypalOrderId && onPaymentComplete) {
        try {
          // Kurze Verzögerung hinzufügen, um sicherzustellen, dass PayPal die Transaktion abgeschlossen hat
          setTimeout(async () => {
            // Callback-Funktion aufrufen, um Bestellstatus zu aktualisieren
            await onPaymentComplete(paypalOrderId);
            console.log("Bestellstatus erfolgreich aktualisiert");
          }, 1000);
        } catch (error) {
          console.error("Fehler beim Aktualisieren des Bestellstatus:", error);
        }
      }
    };

    // Event-Listener registrieren
    window.addEventListener('paypal-payment-success', handlePaymentSuccess);

    // Cleanup-Funktion
    return () => {
      window.removeEventListener('paypal-payment-success', handlePaymentSuccess);

      // Lösche die gespeicherte Bestellungs-ID
      if (orderId) {
        localStorage.removeItem('currentOrderId');
      }
    };
  }, [orderId, onPaymentComplete]);

  // Patche die globale onApprove-Funktion, um unser Event zu triggern
  useEffect(() => {
    // Original-Funktion sichern
    const originalOnApprove = window.onApprove;

    // Neue Funktion, die sowohl original als auch unser Custom-Event aufruft
    window.onApprove = async (data: any) => {
      console.log("PayPal-Zahlung genehmigt", data);

      // Ursprüngliche Funktion aufrufen, falls vorhanden
      if (originalOnApprove) {
        await originalOnApprove(data);
      }

      // Custom-Event auslösen
      const paymentEvent = new CustomEvent('paypal-payment-success', {
        detail: {
          paypalOrderId: data.orderId,
          babixOrderId: orderId
        }
      });

      window.dispatchEvent(paymentEvent);
    };

    // Cleanup-Funktion
    return () => {
      window.onApprove = originalOnApprove;
    };
  }, [orderId]);

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
    onApprove?: (data: any) => Promise<void>;
  }
}