import { useEffect, useState } from 'react';
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

export default function StickerCheckout() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [orderId, setOrderId] = useState<number | null>(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderAmount, setOrderAmount] = useState("15.00");

  // Parameter aus URL extrahieren (z.B. /checkout/sticker?set=3)
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const setParam = searchParams.get('set');
  
  // Stelle sicher, dass der Parameter einer der erlaubten Werte ist
  const validatedSet = ['1', '2', '3', '5', 'full'].includes(setParam || '') 
    ? setParam || '1'
    : '1';
  
  // State für Formular
  const [formError, setFormError] = useState('');
  
  // Initiale Form-Daten
  const getInitialFormData = () => {
    return {
      name: '',
      email: '',
      whatsapp: '',
      selectedSet: validatedSet,
      ingameName: '',
      friendshipLink: '',
      agreedToTerms: false,
      agreedToWithdrawalNotice: false
    };
  };
  
  const [formData, setFormData] = useState(getInitialFormData());

  // Laden der Material Icons
  useEffect(() => {
    document.title = 'Sticker bestellen | babixGO';
    
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Aktualisiert den Bestellbetrag basierend auf dem ausgewählten Set
  useEffect(() => {
    let price;
    switch(formData.selectedSet) {
      case '1':
        price = "15.00";
        break;
      case '2':
        price = "25.00";
        break;
      case '3':
        price = "30.00";
        break;
      case '5':
        price = "40.00";
        break;
      case 'full':
        price = "75.00";
        break;
      default:
        price = "15.00";
    }
    setOrderAmount(price);
  }, [formData.selectedSet]);

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
    return {
      // Persönliche Daten
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp || null,
      
      // Bestelldetails
      productType: 'sticker',
      package: `Sticker Set ${formData.selectedSet}`,
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
    await createOrder();
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
        {/* Sticker Set auswählen */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons text-[#00CFFF]">collections</span>
              Sticker Set auswählen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue={formData.selectedSet}
              onValueChange={(value) => {
                setFormData({
                  ...formData,
                  selectedSet: value
                });
              }}
              className="grid gap-4"
            >
              <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedSet === '1' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="1" id="s-1" className="text-[#00CFFF]" />
                <Label htmlFor="s-1" className="w-full cursor-pointer flex justify-between">
                  <span className="font-medium">1 Sticker Set</span>
                  <span className="font-bold text-[#FF4C00]">15,00 €</span>
                </Label>
              </div>
              
              <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedSet === '2' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="2" id="s-2" className="text-[#00CFFF]" />
                <Label htmlFor="s-2" className="w-full cursor-pointer flex justify-between">
                  <span className="font-medium">2 Sticker Sets</span>
                  <span className="font-bold text-[#FF4C00]">25,00 €</span>
                </Label>
              </div>
              
              <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedSet === '3' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="3" id="s-3" className="text-[#00CFFF]" />
                <Label htmlFor="s-3" className="w-full cursor-pointer flex justify-between">
                  <span className="font-medium">3 Sticker Sets</span>
                  <span className="font-bold text-[#FF4C00]">30,00 €</span>
                </Label>
              </div>
              
              <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedSet === '5' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="5" id="s-5" className="text-[#00CFFF]" />
                <Label htmlFor="s-5" className="w-full cursor-pointer flex justify-between">
                  <span className="font-medium">5 Sticker Sets</span>
                  <span className="font-bold text-[#FF4C00]">40,00 €</span>
                </Label>
              </div>
              
              <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedSet === 'full' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="full" id="s-full" className="text-[#00CFFF]" />
                <Label htmlFor="s-full" className="w-full cursor-pointer flex justify-between">
                  <span className="font-medium">Komplettes Album</span>
                  <span className="font-bold text-[#FF4C00]">75,00 €</span>
                </Label>
              </div>
            </RadioGroup>
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
                setFormData(prev => ({
                  ...prev,
                  agreedToWithdrawalNotice: !prev.agreedToWithdrawalNotice
                }));
              }}
            >
              <input 
                type="checkbox" 
                id="withdrawalCheck"
                className="h-4 w-4 mt-1 accent-[#00CFFF]"
                checked={formData.agreedToWithdrawalNotice}
                onChange={() => {
                  setFormData(prev => ({
                    ...prev,
                    agreedToWithdrawalNotice: !prev.agreedToWithdrawalNotice
                  }));
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
                setFormData(prev => ({
                  ...prev,
                  agreedToTerms: !prev.agreedToTerms
                }));
              }}
            >
              <input 
                type="checkbox" 
                id="termsCheck"
                className="h-4 w-4 mt-1 accent-[#00CFFF]"
                checked={formData.agreedToTerms}
                onChange={() => {
                  setFormData(prev => ({
                    ...prev,
                    agreedToTerms: !prev.agreedToTerms
                  }));
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