import React, { useEffect, useState } from 'react';
import PayPalButton from '@/components/PayPalButton';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paypalSetupComplete, setPaypalSetupComplete] = useState(false);

  // Prüfe PayPal-Konfiguration
  useEffect(() => {
    const checkPayPalConfig = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/paypal/setup');
        const data = await response.json();

        if (!response.ok || !data.isConfigured) {
          console.error('PayPal configuration error:', data.error);
          setError(data.error || 'PayPal ist derzeit nicht verfügbar');
          setPaypalSetupComplete(false);
        } else {
          console.log('PayPal configuration successful');
          setPaypalSetupComplete(true);
        }
      } catch (err) {
        console.error('Error checking PayPal configuration:', err);
        setError('Fehler bei der PayPal-Verbindung');
        setPaypalSetupComplete(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkPayPalConfig();
  }, []);

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
          toast({
            title: "Zahlung erfolgreich",
            description: "Ihre Bestellung wird verarbeitet.",
          });

          // Callback-Funktion aufrufen, um Bestellstatus zu aktualisieren
          await onPaymentComplete(paypalOrderId);
          console.log("Bestellstatus erfolgreich aktualisiert");
        } catch (error) {
          console.error("Fehler beim Aktualisieren des Bestellstatus:", error);
          toast({
            title: "Fehler bei der Bestellverarbeitung",
            description: "Bitte kontaktieren Sie den Support.",
            variant: "destructive",
          });
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

  // Wenn die Konfiguration fehlschlägt, zeige eine Fehlermeldung und einen alternativen Zahlungsweg
  if (error) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          <p className="font-medium">PayPal ist derzeit nicht verfügbar</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-sm mt-2">Sie können alternativ mit Überweisung bezahlen. Bitte kontaktieren Sie uns über das Kontaktformular.</p>
        </div>
        <div className="flex justify-center">
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/kontakt'}
          >
            Zum Kontaktformular
          </Button>
        </div>
      </div>
    );
  }

  // Zeige einen Ladeindikator während der Initialisierung
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4 h-20">
        <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-2 text-sm text-gray-500">PayPal wird geladen...</span>
      </div>
    );
  }

  // Wenn PayPal erfolgreich eingerichtet wurde, zeige den Button
  return (
    <PayPalButton
      amount={parseFloat(amount).toFixed(2)} // Sicherstellen, dass der Preis immer ein gültiges Format hat
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