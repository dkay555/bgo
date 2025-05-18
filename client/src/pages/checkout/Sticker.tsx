import { useEffect, useState, lazy } from 'react';
import { useLocation } from 'wouter';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from '@/lib/queryClient';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PayPalButtonWrapper } from "@/components/PayPalButtonWrapper";
import { Link } from 'wouter';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFormPersistence } from '@/hooks/use-form-persistence';
import { SmoothLazyLoad } from '@/components/SmoothLazyLoad';
import { calculatePrice } from '@/lib/stickerData';
import { useStickerCart } from '@/hooks/use-sticker-cart';

export default function StickerCheckout() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [orderId, setOrderId] = useState<number | null>(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderAmount, setOrderAmount] = useState("15.00");

  // Warenkorb-Daten aus dem Hook laden
  const { cartItems, totalPrice, clearCart } = useStickerCart();
  
  // State für Formular
  const [formError, setFormError] = useState('');
  
  // Initiale Form-Daten
  const getInitialFormData = () => {
    return {
      name: '',
      email: '',
      whatsapp: '',
      selectedSet: 'custom', // Wir verwenden jetzt einen benutzerdefinierten Warenkorb
      ingameName: '',
      friendshipLink: '',
      agreedToTerms: false,
      agreedToWithdrawalNotice: false
    };
  };
  
  // Verwende den Hook für die lokale Speicherung der Formulardaten
  // Die Daten werden für 120 Minuten (2 Stunden) gespeichert
  const [formData, setPersistedFormData, clearPersistedFormData] = useFormPersistence(
    'sticker-checkout', 
    getInitialFormData(),
    120
  );
  
  // Funktion zum Aktualisieren der Formulardaten
  const setFormData = (newData: typeof formData) => {
    setPersistedFormData(newData);
  };

  // Laden der Material Icons und Bestellbetrag setzen
  useEffect(() => {
    document.title = 'Sticker bestellen | babixGO';
    
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Bestellbetrag aus dem Warenkorb setzen
    setOrderAmount(totalPrice.toFixed(2));

    return () => {
      document.head.removeChild(link);
    };
  }, [totalPrice]);

  // Funktion zur Handhabung von Formulareingaben
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Erzeugt eine strukturierte Order aus den Formulardaten
  const createOrderData = () => {
    // Erstelle eine Liste aller Sticker im Warenkorb für die Bestellzusammenfassung
    const stickerList = cartItems.map(item => `${item.name} (${item.stars}★)`).join(", ");
    
    return {
      // Persönliche Daten
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp || null,
      
      // Bestelldetails
      productType: 'sticker',
      package: cartItems.length > 0 
        ? `Individuelle Sticker: ${stickerList}`
        : `Sticker Set ${formData.selectedSet}`,
      price: orderAmount, // String anstatt Zahl
      
      // Monopoly Daten
      authMethod: "authtoken", // Erforderliches Feld
      ingameName: formData.ingameName,
      friendshipLink: formData.friendshipLink,
      
      // Zahlungsdetails
      paymentMethod: "paypal",
      paymentStatus: "pending",
      
      // Zustimmungen
      agreedToTerms: formData.agreedToTerms,
      agreedToWithdrawalNotice: formData.agreedToWithdrawalNotice
    };
  };

  // Sendet die Bestellung an den Server und bereitet PayPal-Zahlung vor
  const createOrder = async () => {
    try {
      setIsSubmitting(true);
      
      const orderData = createOrderData();
      const response = await apiRequest("POST", "/api/orders", orderData);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fehler beim Erstellen der Bestellung");
      }
      
      const data = await response.json();
      setOrderId(data.order.id);
      setShowPayPal(true);
      
      toast({
        title: "Bestellung erstellt",
        description: "Bitte fahren Sie mit der Zahlung fort",
      });
      
      return data.order;
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message || "Etwas ist schiefgelaufen",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return null;
    }
  };

  // Funktion zur Handhabung der Formularübermittlung
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validierung der Checkboxen
    if (!formData.agreedToTerms || !formData.agreedToWithdrawalNotice) {
      setFormError('Bitte akzeptieren Sie sowohl die AGB als auch den Hinweis zum Widerrufsrecht.');
      return;
    }
    
    // Validiere Pflichtfelder
    if (!formData.ingameName || !formData.friendshipLink) {
      setFormError('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    
    setFormError('');
    const orderResult = await createOrder();
    
    // Nach erfolgreicher Bestellung die gespeicherten Formulardaten löschen
    if (orderResult) {
      clearPersistedFormData();
    }
  };
  
  // Aktualisiert den Zahlungsstatus einer Bestellung nach erfolgreicher PayPal-Zahlung
  const updateOrderPayment = async (paymentId: string) => {
    if (!orderId) return;
    
    try {
      const response = await apiRequest("PATCH", `/api/orders/${orderId}/payment`, {
        paymentStatus: "completed",
        paymentReference: paymentId
      });
      
      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren des Zahlungsstatus");
      }
      
      toast({
        title: "Zahlung erfolgreich",
        description: "Vielen Dank für Ihren Einkauf! Wir bearbeiten Ihre Bestellung umgehend.",
      });
      
      // Hier könnte eine Weiterleitung zur Bestellbestätigungsseite erfolgen
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message || "Fehler beim Aktualisieren des Zahlungsstatus",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-['Nunito_Sans'] text-[#0A3A68]">
      <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto my-4 border-b-2 border-[#00CFFF] text-[#FF4C00] babix-info-header">
        Sticker bestellen
      </h1>
      
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        {/* Sticker Auswahl anzeigen */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons text-[#00CFFF]">collections</span>
              Deine Sticker-Auswahl
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <p className="text-gray-500 mb-4">Du hast noch keine Sticker ausgewählt.</p>
                <Link href="/shop/sticker">
                  <Button variant="outline" className="mx-auto">
                    Zurück zum Sticker-Shop
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Ausgewählte Sticker:</h3>
                  <div className="max-h-[300px] overflow-y-auto border border-gray-200 rounded-md divide-y">
                    {cartItems.map((item, index) => (
                      <div key={index} className="p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name} (Set {Math.ceil(item.id / 9)})</p>
                          <div className="flex items-center">
                            {[...Array(item.stars)].map((_, i) => (
                              <span key={i} className="material-icons text-yellow-500 text-sm">star</span>
                            ))}
                            <span className="text-sm text-gray-500 ml-2">
                              {item.isGold ? 'Goldsticker' : 'Standard'}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-[#FF4C00]">
                          {calculatePrice(item).toFixed(2).replace('.', ',')} €
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center font-bold">
                    <span>Gesamtbetrag:</span>
                    <span className="text-[#FF4C00]">{totalPrice.toFixed(2).replace('.', ',')} €</span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Link href="/shop/sticker">
                    <Button variant="outline" className="text-sm">
                      Zurück zum Sticker-Shop
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Persönliche Daten */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons text-[#00CFFF]">person</span>
              Persönliche Daten
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name" className="mb-1 block">Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Ihr vollständiger Name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required
                  className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="mb-1 block">E-Mail *</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="ihre.email@beispiel.de" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required
                  className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                />
              </div>
              
              <div>
                <Label htmlFor="whatsapp" className="mb-1 block flex items-center">
                  WhatsApp (optional)
                  <span className="text-xs text-gray-500 ml-2">Für schnellere Kommunikation</span>
                </Label>
                <Input 
                  id="whatsapp" 
                  name="whatsapp" 
                  placeholder="Ihre WhatsApp-Nummer" 
                  value={formData.whatsapp} 
                  onChange={handleInputChange}
                  className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Monopoly-Account-Daten */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons text-[#00CFFF]">videogame_asset</span>
              Monopoly-Daten
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="ingameName" className="mb-1 block">Spielername *</Label>
                <Input 
                  id="ingameName" 
                  name="ingameName" 
                  placeholder="Ihr Name im Spiel" 
                  value={formData.ingameName} 
                  onChange={handleInputChange} 
                  required
                  className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                />
              </div>
              
              <div>
                <Label htmlFor="friendshipLink" className="mb-1 block flex items-center">
                  Freundschaftslink oder Code *
                  <span className="text-xs text-gray-500 ml-2">Für die Stickerlieferung</span>
                </Label>
                <Input 
                  id="friendshipLink" 
                  name="friendshipLink" 
                  placeholder="Ihr Freundschaftslink oder Code" 
                  value={formData.friendshipLink} 
                  onChange={handleInputChange} 
                  required
                  className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Checkboxen für AGBs und Widerrufsrecht */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            {/* Checkbox für Widerrufsrecht */}
            <div 
              className={`flex items-start space-x-2 p-3 rounded-lg border ${formData.agreedToWithdrawalNotice ? 'bg-[#00CFFF]/10 border-[#00CFFF]' : 'border-gray-200'} mb-4`}
              onClick={() => {
                setFormData({
                  ...formData,
                  agreedToWithdrawalNotice: !formData.agreedToWithdrawalNotice
                });
              }}
            >
              <input 
                type="checkbox" 
                id="withdrawalCheck"
                className="h-4 w-4 mt-1 accent-[#00CFFF]"
                checked={formData.agreedToWithdrawalNotice}
                onChange={() => {
                  setFormData({
                    ...formData,
                    agreedToWithdrawalNotice: !formData.agreedToWithdrawalNotice
                  });
                }}
              />
              <label 
                htmlFor="withdrawalCheck" 
                className="text-sm cursor-pointer"
              >
                Ich bin ausdrücklich damit einverstanden, dass mit der Ausführung des Auftrags vor Ablauf der Widerrufsfrist begonnen wird. Mir ist bekannt, dass mein <Link href="/widerruf" className="text-[#00CFFF] hover:underline">Widerrufsrecht</Link> mit Beginn der Ausführung erlischt.
              </label>
            </div>
            
            {/* Checkbox für AGB */}
            <div 
              className={`flex items-start space-x-2 p-3 rounded-lg border ${formData.agreedToTerms ? 'bg-[#00CFFF]/10 border-[#00CFFF]' : 'border-gray-200'}`}
              onClick={() => {
                setFormData({
                  ...formData,
                  agreedToTerms: !formData.agreedToTerms
                });
              }}
            >
              <input 
                type="checkbox" 
                id="termsCheck"
                className="h-4 w-4 mt-1 accent-[#00CFFF]"
                checked={formData.agreedToTerms}
                onChange={() => {
                  setFormData({
                    ...formData,
                    agreedToTerms: !formData.agreedToTerms
                  });
                }}
              />
              <label 
                htmlFor="termsCheck" 
                className="text-sm cursor-pointer"
              >
                Ich habe die <Link href="/agb" className="text-[#00CFFF] hover:underline">AGB</Link> und <Link href="/datenschutz" className="text-[#00CFFF] hover:underline">Datenschutzbestimmungen</Link> gelesen und akzeptiere diese.
              </label>
            </div>
            
            {/* Fehlermeldung */}
            {formError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                <span className="material-icons text-red-500 text-sm align-middle mr-1">error</span>
                {formError}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Kaufen Button und PayPal */}
        <div className="mb-6 grid grid-cols-1 gap-4">
          {/* Wenn wir noch keine Bestellung erstellt haben, zeigen wir den Bestellbutton an */}
          {!showPayPal ? (
            <Button 
              type="submit" 
              className="w-full bg-[#FF4C00] hover:bg-[#FF4C00]/80 text-white font-bold py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Wird verarbeitet...
                </span>
              ) : 'Jetzt kaufen'}
            </Button>
          ) : (
            /* Wenn wir eine Bestellung erstellt haben, zeigen wir die PayPal-Zahlung an */
            <div className="mb-4">
              <div className="bg-[#00CFFF]/10 p-4 border border-[#00CFFF] rounded-lg mb-4 text-center">
                <h3 className="font-bold text-lg mb-2">Bestellung erstellt!</h3>
                <p>Bitte schließen Sie Ihre Bestellung durch Zahlung über PayPal ab.</p>
              </div>
              
              <div className="py-4 px-4 border border-gray-200 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2 border-b pb-2">
                  <span className="font-medium">Produkt:</span>
                  <span>Sticker Set {formData.selectedSet}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Gesamt:</span>
                  <span className="text-[#FF4C00]">{orderAmount}€</span>
                </div>
              </div>
              
              <div className="my-4 mx-auto max-w-xs h-12">
                <PayPalButtonWrapper 
                  amount={orderAmount} 
                  currency="EUR" 
                  intent="CAPTURE" 
                  orderId={orderId ?? undefined}
                  onPaymentComplete={updateOrderPayment}
                />
              </div>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">oder zahle mit</span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full" disabled>
            <span className="material-icons mr-2 text-lg">account_balance</span>
            Banküberweisung (bald verfügbar)
          </Button>
        </div>
      </form>
    </div>
  );
}