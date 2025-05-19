import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AlternativePaymentProps {
  productName: string;
  amount: string;
  customerName: string;
  customerEmail: string;
  whatsappNumber?: string;
  gameUsername: string;
  productDetails: any;
}

/**
 * Alternative Zahlungsmethode für den Fall, dass PayPal nicht funktioniert
 */
export function AlternativePayment({
  productName,
  amount,
  customerName,
  customerEmail,
  whatsappNumber,
  gameUsername,
  productDetails
}: AlternativePaymentProps) {
  const { toast } = useToast();

  const handleAlternativePayment = async () => {
    try {
      // Speichere Bestelldaten für die Erfolgsseite
      localStorage.setItem('latest_order_data', JSON.stringify({
        productName,
        amount,
        gameUsername,
        boostTime: productDetails.boostTime,
        paymentMethod: 'Vorkasse/Überweisung'
      }));
      
      // API-Aufruf zum Erstellen der Bestellung
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod: 'bank_transfer',
          paymentStatus: 'pending',
          customerName,
          customerEmail,
          whatsappNumber: whatsappNumber || '',
          gameUsername,
          productType: 'wuerfel',
          productName,
          productDetails: JSON.stringify(productDetails),
          amount
        }),
      });
      
      if (response.ok) {
        toast({
          title: "Bestellung erfolgreich aufgegeben",
          description: "Wir haben deine Bestellung erhalten und werden dich mit den Zahlungsdetails kontaktieren.",
        });
        
        // Verzögerung vor Weiterleitung
        setTimeout(() => {
          window.location.href = '/checkout/Erfolg';
        }, 1500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fehler beim Erstellen der Bestellung");
      }
    } catch (error) {
      console.error('Fehler beim Senden der Bestelldaten:', error);
      toast({
        title: "Fehler",
        description: "Es gab ein Problem bei der Bestellung. Bitte kontaktiere uns.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex items-center mb-2">
        <div className="mr-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white">
          <span className="text-xs">2</span>
        </div>
        <h4 className="font-medium">Alternative: Bestellung per Überweisung</h4>
      </div>
      
      <div className="pl-7">
        <p className="text-sm text-gray-600 mb-3">
          Falls PayPal nicht funktioniert, kannst du auch per Überweisung bezahlen.
          Wir kontaktieren dich nach der Bestellung mit den Zahlungsdaten.
        </p>
        
        <Button 
          type="button"
          onClick={handleAlternativePayment}
          className="bg-[#0A3A68] hover:bg-[#072750] w-full"
        >
          Bestellung per Überweisung aufgeben
        </Button>
      </div>
    </div>
  );
}