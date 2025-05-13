import React, { useState } from 'react';
import { PayPalButtonWrapper } from '@/components/PayPalButtonWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

export default function PayPalTest() {
  const [amount, setAmount] = useState<string>('10.00');
  const [currency, setCurrency] = useState<string>('EUR');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const handlePaymentComplete = async (paypalOrderId: string) => {
    setIsProcessing(true);
    
    try {
      // Simuliere einen API-Call, um die Zahlung zu bestätigen
      console.log(`Zahlung abgeschlossen mit PayPal-Bestellungs-ID: ${paypalOrderId}`);
      
      // Zeige eine Erfolgsmeldung
      toast({
        title: 'Zahlung erfolgreich',
        description: `PayPal-Bestellungs-ID: ${paypalOrderId}`,
        variant: 'default',
      });
      
      // Aktualisiere den Status der Komponente
      setIsProcessing(false);
    } catch (error) {
      console.error('Fehler bei der Verarbeitung der Zahlung:', error);
      
      toast({
        title: 'Fehler bei der Zahlung',
        description: 'Die Zahlung konnte nicht verarbeitet werden.',
        variant: 'destructive',
      });
      
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">PayPal-Test</h1>
      
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Zahlungsdetails</CardTitle>
            <CardDescription>
              Geben Sie den Betrag ein und testen Sie die PayPal-Zahlung
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Betrag</Label>
                <Input
                  id="amount"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="10.00"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Währung</Label>
                <Input
                  id="currency"
                  type="text"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  placeholder="EUR"
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <div className="w-full">
              <PayPalButtonWrapper
                amount={amount}
                currency={currency}
                intent="CAPTURE"
                onPaymentComplete={handlePaymentComplete}
              />
            </div>
            
            {isProcessing && (
              <div className="text-center text-sm text-gray-500">
                Verarbeite Zahlung...
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}