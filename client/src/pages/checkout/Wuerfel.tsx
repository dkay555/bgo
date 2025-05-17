import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PayPalButtonWrapper } from "@/components/PayPalButtonWrapper";
import { Link } from 'wouter';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";

// Produkttypen
interface Product {
  id: number;
  name: string;
  description: string;
  productType: string;
  variant: string;
  price: string;
  isActive: boolean;
  stock: number;
}

export default function WuerfelCheckoutPage() {
  const [location] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [orderId, setOrderId] = useState<number | null>(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderAmount, setOrderAmount] = useState("25.00");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  // Parameter aus URL extrahieren (z.B. /checkout/wuerfel?amount=25000)
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const amountParam = searchParams.get('amount');
  
  // Würfel-Produkte aus der Datenbank abrufen
  const { data: diceProducts, isLoading: isLoadingProducts } = useQuery<{success: boolean, products: Product[]}>({
    queryKey: ['/api/products/type/dice']
  });

  // Effekt zum Setzen des ausgewählten Produkts, wenn Daten geladen wurden
  useEffect(() => {
    if (diceProducts?.success && diceProducts.products.length > 0) {
      // Default-Produkt basierend auf URL-Parameter oder erstes Produkt auswählen
      const product = amountParam 
        ? diceProducts.products.find((p: Product) => p.variant === amountParam) || diceProducts.products[0]
        : diceProducts.products[0];
      
      setSelectedProductId(product.id);
      setOrderAmount(product.price);
    }
  }, [diceProducts, amountParam]);
  
  // Ausgewähltes Produkt
  const selectedProduct = diceProducts?.products?.find((p: Product) => p.id === selectedProductId);
  
  // State für Formular
  const [formError, setFormError] = useState('');
  
  // Initiale Form-Daten
  const getInitialFormData = () => {
    // Standardwert für selected_amount ist die erste Variante aus den verfügbaren Paketen
    // oder '25000' wenn keine Pakete vorhanden sind
    const defaultAmount = diceProducts?.products?.[0]?.variant || '25000';
    
    return {
      name: '',
      email: '',
      whatsapp: '',
      selectedAmount: amountParam || defaultAmount,
      authMethod: 'authtoken', // 'authtoken' oder 'login'
      ingameName: '',
      authToken: '',
      fbEmail: '',
      fbPassword: '',
      recoveryCode1: '',
      recoveryCode2: '',
      executionTime: 'sofort', // 'sofort' oder 'bahnhofsturnier'
      specificExecutionTime: '',
      agreedToTerms: false,
      agreedToWithdrawalNotice: false
    };
  };
  
  const [formData, setFormData] = useState(getInitialFormData());

  // Laden der Material Icons
  useEffect(() => {
    document.title = 'Würfelboost | babixGO';
    
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Aktualisiert den Bestellbetrag basierend auf dem ausgewählten Produkt
  useEffect(() => {
    // Wenn das Produkt in den Datenbankprodukten gefunden wird, verwenden wir dessen Preis
    if (diceProducts?.products && diceProducts.products.length > 0) {
      const selectedProduct = diceProducts.products.find(
        (p: Product) => p.variant === formData.selectedAmount
      );
      
      if (selectedProduct) {
        setOrderAmount(selectedProduct.price);
        setSelectedProductId(selectedProduct.id);
        return;
      }
    }
    
    // Fallback zu den statischen Werten, falls das Produkt nicht gefunden wird
    let price;
    switch(formData.selectedAmount) {
      case '25000':
        price = 25.00;
        break;
      case '35000':
        price = 35.00;
        break;
      case '45000':
        price = 45.00;
        break;
      case 'schnupper':
        price = 10.00; // Schnupperboost
        break;
      case 'schnupper_events':
        price = 15.00; // Schnupperboost + Events
        break;
      default:
        price = 25.00;
    }
    setOrderAmount(price.toFixed(2));
  }, [formData.selectedAmount, diceProducts]);

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
    // Authentifizierungsdaten basierend auf der Methode
    const authData = formData.authMethod === 'authtoken' 
      ? { authToken: formData.authToken }
      : { 
          fbEmail: formData.fbEmail, 
          fbPassword: formData.fbPassword,
          recoveryCode1: formData.recoveryCode1,
          recoveryCode2: formData.recoveryCode2
        };
    
    return {
      // Persönliche Daten
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp || null,
      
      // Bestelldetails
      productType: 'dice',
      package: formData.selectedAmount,
      price: orderAmount, // Als String belassen, wie in der Datenbank erwartet
      
      // Monopoly-Daten
      authMethod: formData.authMethod,
      ingameName: formData.ingameName,
      
      // Auth-Daten als JSON
      accountData: JSON.stringify({
        ...authData,
        executionTime: formData.executionTime,
        specificExecutionTime: formData.executionTime === 'spezifisch' ? formData.specificExecutionTime : null
      }),
      
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
      
      console.log("Formulardaten vor dem Senden:", formData);
      
      const orderData = createOrderData();
      
      // Sicherstellen, dass alle notwendigen Felder definiert sind
      if (!orderData.authMethod) {
        orderData.authMethod = 'authtoken'; // Default-Wert als Fallback
      }
      
      // Sicherstellen, dass ingameName definiert ist
      if (!orderData.ingameName) {
        orderData.ingameName = 'Nicht angegeben'; // Fallback-Wert
      }
      
      // Sicherstellen, dass der Preis als String im richtigen Format übergeben wird
      const numericPrice = typeof orderData.price === 'number' 
        ? orderData.price 
        : parseFloat(orderData.price);
      
      orderData.price = numericPrice.toFixed(2);
      
      console.log("Zu sendende Bestelldaten:", orderData);
      
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
    
    // Validiere Authentifizierungsdaten
    if (formData.authMethod === 'authtoken' && !formData.authToken) {
      setFormError('Bitte geben Sie Ihren Auth-Token ein.');
      return;
    }
    
    if (formData.authMethod === 'login' && (!formData.fbEmail || !formData.fbPassword)) {
      setFormError('Bitte geben Sie Ihre Facebook-Anmeldedaten ein.');
      return;
    }
    
    // Validiere für FB Login die Wiederherstellungscodes
    if (formData.authMethod === 'login' && (!formData.recoveryCode1 || !formData.recoveryCode2)) {
      setFormError('Bitte geben Sie beide Wiederherstellungscodes ein.');
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
        Würfelboost bestellen
      </h1>
      
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        {/* Würfelpaket auswählen */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons text-[#00CFFF]">casino</span>
              Würfelpaket auswählen
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingProducts ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-[#00CFFF]" />
                <span className="ml-2">Lade Würfelpakete...</span>
              </div>
            ) : (
              <RadioGroup 
                defaultValue={formData.selectedAmount}
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    selectedAmount: value
                  });
                }}
                className="grid gap-4"
              >
                {diceProducts?.success && diceProducts.products.length > 0 ? (
                  // Dynamische Produkte aus der Datenbank
                  diceProducts.products.map((product: Product) => (
                    <div 
                      key={product.id}
                      className={`flex items-center space-x-2 p-4 rounded-lg border ${
                        formData.selectedAmount === product.variant 
                          ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <RadioGroupItem 
                        value={product.variant} 
                        id={`w-${product.id}`} 
                        className="text-[#00CFFF]" 
                      />
                      <Label 
                        htmlFor={`w-${product.id}`} 
                        className="w-full cursor-pointer flex justify-between"
                      >
                        <div>
                          <span className="font-medium">{product.name}</span>
                          {product.description && (
                            <p className="text-sm text-gray-500">{product.description}</p>
                          )}
                        </div>
                        <span className="font-bold text-[#FF4C00]">
                          {parseFloat(product.price).toFixed(2).replace('.', ',')} €
                        </span>
                      </Label>
                    </div>
                  ))
                ) : (
                  // Fallback zu statischen Optionen, falls keine Produkte aus der Datenbank verfügbar sind
                  <>
                    <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedAmount === '25000' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <RadioGroupItem value="25000" id="w-25000" className="text-[#00CFFF]" />
                      <Label htmlFor="w-25000" className="w-full cursor-pointer flex justify-between">
                        <span className="font-medium">25.000 Würfel</span>
                        <span className="font-bold text-[#FF4C00]">25,00 €</span>
                      </Label>
                    </div>
                    
                    <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedAmount === '35000' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <RadioGroupItem value="35000" id="w-35000" className="text-[#00CFFF]" />
                      <Label htmlFor="w-35000" className="w-full cursor-pointer flex justify-between">
                        <span className="font-medium">35.000 Würfel</span>
                        <span className="font-bold text-[#FF4C00]">35,00 €</span>
                      </Label>
                    </div>
                    
                    <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedAmount === '45000' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <RadioGroupItem value="45000" id="w-45000" className="text-[#00CFFF]" />
                      <Label htmlFor="w-45000" className="w-full cursor-pointer flex justify-between">
                        <span className="font-medium">45.000 Würfel</span>
                        <span className="font-bold text-[#FF4C00]">45,00 €</span>
                      </Label>
                    </div>
                    
                    <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedAmount === 'schnupper' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <RadioGroupItem value="schnupper" id="w-schnupper" className="text-[#00CFFF]" />
                      <Label htmlFor="w-schnupper" className="w-full cursor-pointer flex justify-between">
                        <div>
                          <span className="font-medium">Schnupperboost</span>
                          <p className="text-sm text-gray-500">Kleinerer Boost zum Testen</p>
                        </div>
                        <span className="font-bold text-[#FF4C00]">10,00 €</span>
                      </Label>
                    </div>
                    
                    <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedAmount === 'schnupper_events' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <RadioGroupItem value="schnupper_events" id="w-schnupper_events" className="text-[#00CFFF]" />
                      <Label htmlFor="w-schnupper_events" className="w-full cursor-pointer flex justify-between">
                        <div>
                          <span className="font-medium">Schnupperboost + Events</span>
                          <p className="text-sm text-gray-500">Kleinerer Boost inkl. Events</p>
                        </div>
                        <span className="font-bold text-[#FF4C00]">15,00 €</span>
                      </Label>
                    </div>
                  </>
                )}
              </RadioGroup>
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
                <Label className="mb-1 block">Authentifizierungsmethode *</Label>
                <Tabs
                  value={formData.authMethod}
                  onValueChange={(value) => setFormData({...formData, authMethod: value as 'authtoken' | 'login'})}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="authtoken">Auth-Token (empfohlen)</TabsTrigger>
                    <TabsTrigger value="login">Facebook-Login</TabsTrigger>
                  </TabsList>
                  <TabsContent value="authtoken" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="authToken" className="mb-1 block flex items-center">
                          Auth-Token *
                          <span className="text-xs text-gray-500 ml-2">
                            <Link href="/hilfe/authtoken" className="text-[#00CFFF] hover:underline">
                              Wie finde ich meinen Token?
                            </Link>
                          </span>
                        </Label>
                        <Input 
                          id="authToken" 
                          name="authToken" 
                          placeholder="Ihr Auth-Token aus dem Spiel" 
                          value={formData.authToken} 
                          onChange={handleInputChange}
                          className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="login" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fbEmail" className="mb-1 block">Facebook E-Mail *</Label>
                        <Input 
                          id="fbEmail" 
                          name="fbEmail" 
                          placeholder="Ihre Facebook E-Mail" 
                          value={formData.fbEmail} 
                          onChange={handleInputChange}
                          className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="fbPassword" className="mb-1 block">Facebook Passwort *</Label>
                        <Input 
                          id="fbPassword" 
                          name="fbPassword" 
                          type="password"
                          placeholder="Ihr Facebook Passwort" 
                          value={formData.fbPassword} 
                          onChange={handleInputChange}
                          className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="recoveryCode1" className="mb-1 block">Wiederherstellungscode 1 *</Label>
                        <Input 
                          id="recoveryCode1" 
                          name="recoveryCode1" 
                          placeholder="Erster Wiederherstellungscode" 
                          value={formData.recoveryCode1 || ''} 
                          onChange={handleInputChange}
                          className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="recoveryCode2" className="mb-1 block">Wiederherstellungscode 2 *</Label>
                        <Input 
                          id="recoveryCode2" 
                          name="recoveryCode2" 
                          placeholder="Zweiter Wiederherstellungscode" 
                          value={formData.recoveryCode2 || ''} 
                          onChange={handleInputChange}
                          className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Ausführungszeitpunkt */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons text-[#00CFFF]">schedule</span>
              Ausführungszeitpunkt
            </CardTitle>
            <CardDescription>
              Wann sollen die Würfel dem Account hinzugefügt werden?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue={formData.executionTime}
              onValueChange={(value) => {
                setFormData({
                  ...formData,
                  executionTime: value as 'sofort' | 'bahnhofsturnier'
                });
              }}
              className="grid gap-4"
            >
              <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.executionTime === 'sofort' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="sofort" id="time-sofort" className="text-[#00CFFF]" />
                <Label htmlFor="time-sofort" className="w-full cursor-pointer">
                  <span className="font-medium">Schnellstmöglich</span>
                  <p className="text-sm text-gray-500">Die Würfel werden so bald wie möglich hinzugefügt</p>
                </Label>
              </div>
              
              <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.executionTime === 'bahnhofsturnier' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="bahnhofsturnier" id="time-bahnhofsturnier" className="text-[#00CFFF]" />
                <Label htmlFor="time-bahnhofsturnier" className="w-full cursor-pointer">
                  <span className="font-medium">Zum nächsten Bahnhofsturnier</span>
                  <p className="text-sm text-gray-500">Die Würfel werden zum nächsten Bahnhofsturnier hinzugefügt</p>
                </Label>
              </div>
            </RadioGroup>
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
                  <span>{formData.selectedAmount} Würfel</span>
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