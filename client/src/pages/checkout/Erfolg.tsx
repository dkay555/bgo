import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import { useAuth } from '@/hooks/use-auth';

export default function BestellungErfolg() {
  const { user } = useAuth();
  const [orderData, setOrderData] = useState<any>(null);
  
  // Versuche, die Bestelldaten aus dem localStorage zu laden
  useEffect(() => {
    const savedOrderData = localStorage.getItem('latest_order_data');
    if (savedOrderData) {
      try {
        setOrderData(JSON.parse(savedOrderData));
      } catch (e) {
        console.error('Fehler beim Parsen der Bestelldaten:', e);
      }
    }
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <SEOHead 
        pageName="Bestellung erfolgreich" 
        customTitle="Bestellung erfolgreich | babixGO" 
        customDescription="Ihre Bestellung bei babixGO wurde erfolgreich abgeschlossen. Vielen Dank für Ihr Vertrauen!"
      />
      
      <div className="max-w-3xl mx-auto">
        <Card className="border-t-4 border-t-green-500">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bestellung erfolgreich!</h1>
              <p className="text-gray-600 mt-2">Vielen Dank für deine Bestellung bei babixGO!</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-[#00CFFF] mb-4">Bestellbestätigung</h2>
              <p className="mb-4">Hallo <strong className="text-[#FF4C00]">{user?.name || 'Kunde'}</strong>,</p>
              <p className="mb-4">vielen Dank für deine Bestellung bei <strong className="text-[#FF4C00]">babixGO</strong>! Wir haben deine Anfrage erhalten und prüfen nun deine Angaben.</p>

              {orderData ? (
                <>
                  <p className="font-semibold text-[#0A3A68] mb-2">Bestellübersicht:</p>
                  <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>Produkt: {orderData.productName || 'Würfelboost'}</li>
                    <li>Preis: {orderData.amount || '25'} €</li>
                    <li>Account: {orderData.gameUsername || 'Dein Ingame-Name'}</li>
                    <li>Wunschtermin: {orderData.boostTime === 'asap' ? 'schnellstmöglich' : 'nächstes Bahnhofsturnier'}</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="font-semibold text-[#0A3A68] mb-2">Bestellübersicht:</p>
                  <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>Produkt: Würfelboost</li>
                    <li>Preis: gemäß deiner Auswahl</li>
                    <li>Account: Dein Ingame-Name</li>
                    <li>Wunschtermin: entsprechend deiner Auswahl</li>
                  </ul>
                </>
              )}

              <p className="mb-2">Sobald alles geprüft ist, melden wir uns bei dir zur Bestätigung.</p>
              <p>MoGo-Grüße<br/><strong className="text-[#FF4C00]">dein babixGO Team</strong></p>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-gray-600">Du erhältst in Kürze eine Bestätigungsmail mit allen Details zu deiner Bestellung.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Link href="/">
                  <Button variant="default" className="bg-[#0A3A68]">
                    Zurück zur Startseite
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" className="border-[#0A3A68] text-[#0A3A68]">
                    Weitere Produkte entdecken
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}