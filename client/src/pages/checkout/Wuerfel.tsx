import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { PricingCard } from '@/components/PricingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PayPalButtonWrapper } from '@/components/PayPalButtonWrapper';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";


export default function WuerfelCheckout() {
  // URL-Parameter auslesen
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const { toast } = useToast();
  
  // States für Zahlungs- und Bestellungsablauf
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [orderAmount, setOrderAmount] = useState("25.00");
  const [orderId, setOrderId] = useState<number | null>(null);
  
  // Parameter für das Würfelpaket
  const packageParam = searchParams.get('package');
  
  // Stelle sicher, dass der Parameter einer der erlaubten Werte ist
  const validatedPackage = ['25000', '35000', '45000'].includes(packageParam || '') 
    ? packageParam || '25000'
    : '25000';
  
  // State für Formular mit reduziertem Beispiel-Code
  const [authMethod, setAuthMethod] = useState('authtoken');
  const [formError, setFormError] = useState('');
  
  // Erstelle und unmittelbar aktualisiere den State
  const getInitialFormData = () => {
    // Ein spezifischer, vereinfachter State
    return {
      name: '',
      email: '',
      whatsapp: '',
      ingameName: '',
      authtoken: '',
      loginEmail: '',
      password: '',
      loginIngameName: '',
      recoveryCode1: '',
      recoveryCode2: '',
      selectedPackage: validatedPackage,
      agreedToTerms: false,
      agreedToWithdrawalNotice: false
    };
  };
  
  const [formData, setFormData] = useState(getInitialFormData());

  // Laden der Material Icons
  useEffect(() => {
    document.title = 'Würfel kaufen | babixGO';
    
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Aktualisiert den Bestellbetrag basierend auf der Würfelpaketauswahl
  useEffect(() => {
    // Setze den Bestellbetrag basierend auf dem ausgewählten Paket
    if (formData.selectedPackage === "25000") {
      setOrderAmount("25.00");
    } else if (formData.selectedPackage === "35000") {
      setOrderAmount("35.00");
    } else if (formData.selectedPackage === "45000") {
      setOrderAmount("45.00");
    }
  }, [formData.selectedPackage]);

  // Funktion zur Handhabung von Formulareingaben
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    // Keine Abhängigkeit zwischen den Checkboxen
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Funktion zur Umschaltung der Auth-Methode
  const handleAuthMethodChange = (method: string) => {
    setAuthMethod(method);
  };

  // Erzeugt eine strukturierte Order aus den Formulardaten
  const createOrderData = () => {
    return {
      // Persönliche Daten
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp || null,
      
      // Bestelldetails
      package: formData.selectedPackage,
      price: parseFloat(orderAmount),
      
      // Monopoly Daten
      authMethod: authMethod,
      ingameName: authMethod === 'authtoken' ? formData.ingameName : formData.loginIngameName,
      
      // Auth-spezifische Daten
      authtoken: authMethod === 'authtoken' ? formData.authtoken : null,
      loginEmail: authMethod === 'login' ? formData.loginEmail : null,
      password: authMethod === 'login' ? formData.password : null,
      recoveryCode1: authMethod === 'login' ? formData.recoveryCode1 : null,
      recoveryCode2: authMethod === 'login' ? formData.recoveryCode2 : null,
      
      // Zahlungsdetails
      paymentMethod: "paypal", // Erstmal immer PayPal
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
    
    // Validiere auth-spezifische Felder
    if (authMethod === 'authtoken') {
      if (!formData.ingameName || !formData.authtoken) {
        setFormError('Bitte füllen Sie alle Pflichtfelder aus.');
        return;
      }
    } else if (authMethod === 'login') {
      if (!formData.loginIngameName || !formData.loginEmail || !formData.password || 
          !formData.recoveryCode1 || !formData.recoveryCode2) {
        setFormError('Bitte füllen Sie alle Pflichtfelder aus.');
        return;
      }
    }
    
    setFormError('');
    await createOrder();
  };
  
  // Aktualisiert den Zahlungsstatus einer Bestellung nach erfolgreicher PayPal-Zahlung
  const updateOrderPayment = async (paymentId: string) => {
    if (!orderId) return;
    
    try {
      const response = await apiRequest("PATCH", `/api/orders/${orderId}/payment`, {
        status: "completed",
        reference: paymentId
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
        Würfel kaufen
      </h1>
      
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        {/* Würfelmenge auswählen */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons text-[#00CFFF]">sports_score</span>
              Würfelmenge auswählen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue={formData.selectedPackage}
              onValueChange={(value) => {
                setFormData({
                  ...formData,
                  selectedPackage: value
                });
              }}
              className="grid gap-4"
            >
              <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedPackage === "25000" ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="25000" id="r-25000" className="text-[#00CFFF]" />
                <Label htmlFor="r-25000" className="w-full cursor-pointer flex justify-between">
                  <span className="font-medium">25.000 Würfel</span>
                  <span className="font-bold text-[#FF4C00]">25€</span>
                </Label>
              </div>
              
              <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedPackage === "35000" ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="35000" id="r-35000" className="text-[#00CFFF]" />
                <Label htmlFor="r-35000" className="w-full cursor-pointer flex justify-between">
                  <span className="font-medium">35.000 Würfel</span>
                  <span className="font-bold text-[#FF4C00]">35€</span>
                </Label>
              </div>
              
              <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedPackage === "45000" ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="45000" id="r-45000" className="text-[#00CFFF]" />
                <Label htmlFor="r-45000" className="w-full cursor-pointer flex justify-between">
                  <span className="font-medium">45.000 Würfel</span>
                  <span className="font-bold text-[#FF4C00]">45€</span>
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
        
        {/* Monopoly Daten */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons text-[#00CFFF]">videogame_asset</span>
              Monopoly Daten
            </CardTitle>
            <div className="text-sm text-gray-600 mt-1">
              Weitere Informationen zu den Möglichkeiten findest du hier: 
              <Link href="/hilfe/login" className="text-[#00CFFF] hover:underline ml-1">Login Hilfe</Link> | 
              <Link href="/hilfe/authtoken" className="text-[#00CFFF] hover:underline ml-1">Auth-Token Anleitung</Link>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="authtoken" onValueChange={handleAuthMethodChange}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="authtoken">Authtoken</TabsTrigger>
                <TabsTrigger value="login">Facebook Zugangsdaten</TabsTrigger>
              </TabsList>
              
              <TabsContent value="authtoken" className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="ingameName" className="mb-1 block">Ingame Name *</Label>
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
                  <Label htmlFor="authtoken" className="mb-1 block flex items-center">
                    Authtoken *
                    <Link href="/hilfe/authtoken" className="text-xs text-[#00CFFF] hover:underline ml-2">
                      (Wie bekomme ich den Authtoken?)
                    </Link>
                  </Label>
                  <Input 
                    id="authtoken" 
                    name="authtoken" 
                    placeholder="Ihr Authtoken aus der App" 
                    value={formData.authtoken} 
                    onChange={handleInputChange} 
                    required
                    className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="login" className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="loginIngameName" className="mb-1 block">Ingame Name *</Label>
                  <Input 
                    id="loginIngameName" 
                    name="loginIngameName" 
                    placeholder="Ihr Name im Spiel" 
                    value={formData.loginIngameName} 
                    onChange={handleInputChange} 
                    required
                    className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="loginEmail" className="mb-1 block">Email / Handynummer *</Label>
                  <Input 
                    id="loginEmail" 
                    name="loginEmail" 
                    placeholder="Ihre Facebook Email oder Handynummer" 
                    value={formData.loginEmail} 
                    onChange={handleInputChange} 
                    required
                    className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="mb-1 block">Passwort *</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="Ihr Facebook Passwort" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                    required
                    className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="recoveryCode1" className="mb-1 block">Wiederherstellungscode 1 *</Label>
                    <Input 
                      id="recoveryCode1" 
                      name="recoveryCode1" 
                      placeholder="Code 1" 
                      value={formData.recoveryCode1} 
                      onChange={handleInputChange} 
                      required
                      className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recoveryCode2" className="mb-1 block">Wiederherstellungscode 2 *</Label>
                    <Input 
                      id="recoveryCode2" 
                      name="recoveryCode2" 
                      placeholder="Code 2" 
                      value={formData.recoveryCode2} 
                      onChange={handleInputChange} 
                      required
                      className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
                  <span>{formData.selectedPackage} Würfel</span>
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

          <div 
            className="flex justify-center items-center min-h-[44px] border border-gray-300 rounded-md p-2"
            style={{ 
              height: "50px", 
              width: "100%"
            }}
          >
            {/* PayPal Button mit Fallback */}
            <button
              type="button"
              className="w-full h-full flex justify-center items-center"
              onClick={() => {
                // Fallback für PayPal
                window.open("https://www.paypal.com/de/home", "_blank");
              }}
            >
              <img 
                src="https://www.paypalobjects.com/webstatic/de_DE/i/de-pp-logo-150px.png" 
                alt="PayPal" 
                style={{ height: "24px" }} 
              />
            </button>
          </div>
        </div>
        
        {/* Informationen zum Datenschutz */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-sm text-gray-600">
          <p className="mb-2">
            <span className="material-icons text-[#00CFFF] text-sm align-middle mr-1">shield</span>
            Ihre Daten werden sicher verschlüsselt übertragen und nur für die Auftragsabwicklung verwendet.
          </p>
          <p>
            <span className="material-icons text-[#00CFFF] text-sm align-middle mr-1">support_agent</span>
            Bei Fragen kontaktieren Sie uns über <Link href="/kontakt" className="text-[#00CFFF] hover:underline">das Kontaktformular</Link> oder <a href="https://wa.me/4915237250453" className="text-[#00CFFF] hover:underline">WhatsApp</a>.
          </p>
        </div>
      </form>
    </div>
  );
}