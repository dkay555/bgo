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

// Währungspakete
const WAEHRUNG_PAKETE = [
  { amount: '15000', price: '25.00', label: '15.000 Eventwährung (25,00 €)' },
  { amount: '25000', price: '35.00', label: '25.000 Eventwährung (35,00 €)' }
];

export default function EventwaehrungCheckoutPage() {
  const [location] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [orderId, setOrderId] = useState<number | null>(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderAmount, setOrderAmount] = useState("25.00");

  // Parameter aus URL extrahieren (z.B. /checkout/eventwaehrung?amount=15000)
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const amountParam = searchParams.get('amount');
  
  // Stelle sicher, dass der Parameter einer der erlaubten Werte ist
  const validatedAmount = ['15000', '25000'].includes(amountParam || '') 
    ? amountParam || '15000'
    : '15000';
    
  // Preisberechnung für Eventwährung
  const getWaehrungPrice = (amount: string): string => {
    switch (amount) {
      case '15000': return '25.00';
      case '25000': return '35.00';
      default: return '25.00';
    }
  };
  
  // State für Formular
  const [formError, setFormError] = useState('');
  
  // Initiale Form-Daten
  const getInitialFormData = () => {
    return {
      name: '',
      email: '',
      whatsapp: '',
      selectedAmount: validatedAmount,
      accountInfo: {
        ingameName: '',
        authMethod: 'facebook',
        executionTime: 'automatic'
      },
      agreedToTerms: false,
      agreedToWithdrawalNotice: false
    };
  };
  
  const [formData, setFormData] = useState(getInitialFormData());

  // Bei Änderungen des Währungs-Parameters den Preis aktualisieren
  useEffect(() => {
    setOrderAmount(getWaehrungPrice(validatedAmount));
    setFormData(prev => ({
      ...prev,
      selectedAmount: validatedAmount
    }));
  }, [validatedAmount]);

  // Laden der Material Icons und Titel setzen
  useEffect(() => {
    document.title = 'Eventwährung | babixGO';
    
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      const existingLink = document.querySelector('link[href="https://fonts.googleapis.com/icon?family=Material+Icons"]');
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
    };
  }, []);

  // Benutzerinformationen vorausfüllen, wenn der Benutzer angemeldet ist
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  // Handler für Formularänderungen
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Für verschachtelte Objekte (accountInfo)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handler für Checkbox-Änderungen
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  // Handler für Radio-Änderungen
  const handleRadioChange = (name: string, value: string) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handler für Select-Änderungen
  const handleSelectChange = (name: string, value: string) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // Wenn das ausgewählte Paket geändert wird, aktualisiere den Preis
      if (name === 'selectedAmount') {
        setOrderAmount(getWaehrungPrice(value));
      }
    }
  };

  // Validierung des Formulars
  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError('Bitte geben Sie Ihren Namen ein.');
      return false;
    }
    
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setFormError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return false;
    }
    
    if (!formData.accountInfo.ingameName.trim()) {
      setFormError('Bitte geben Sie Ihren Ingame-Namen ein.');
      return false;
    }
    
    if (!formData.agreedToTerms) {
      setFormError('Bitte akzeptieren Sie die AGB.');
      return false;
    }
    
    if (!formData.agreedToWithdrawalNotice) {
      setFormError('Bitte bestätigen Sie den Verzicht auf das Widerrufsrecht bei digitalen Inhalten.');
      return false;
    }
    
    setFormError('');
    return true;
  };

  // Erzeugt eine strukturierte Order aus den Formulardaten
  const createOrderData = () => {
    return {
      // Persönliche Daten
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp || null,
      
      // Bestelldetails
      productType: 'eventwaehrung',
      package: `${formData.selectedAmount} Eventwährung`,
      price: parseFloat(orderAmount),
      
      // Accountdaten als JSON
      accountData: JSON.stringify({
        ingameName: formData.accountInfo.ingameName,
        authMethod: formData.accountInfo.authMethod,
        executionTime: formData.accountInfo.executionTime
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
      
      const orderData = createOrderData();
      const response = await apiRequest("POST", "/api/orders", orderData);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fehler beim Erstellen der Bestellung");
      }
      
      const data = await response.json();
      setOrderId(data.order.id);
      setShowPayPal(true);
      
      // Erfolgsmeldung anzeigen
      toast({
        title: "Bestellung erstellt",
        description: "Bitte schließen Sie die Zahlung ab.",
      });
      
    } catch (error) {
      console.error("Fehler beim Erstellen der Bestellung:", error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler für das Absenden des Formulars
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      createOrder();
    } else {
      // Scroll zum Fehler
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Erfolgreiche Zahlung
  const handlePaymentComplete = async (paypalOrderId: string) => {
    try {
      if (!orderId) return;
      
      const response = await apiRequest("PATCH", `/api/orders/${orderId}/payment`, {
        status: "completed",
        reference: paypalOrderId
      });
      
      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren des Zahlungsstatus");
      }
      
      // Cache für Bestellungen invalidieren
      queryClient.invalidateQueries(["/api/user/orders"]);
      
      // Erfolgsmeldung anzeigen
      toast({
        title: "Zahlung erfolgreich",
        description: "Vielen Dank für Ihre Bestellung! Sie werden in Kürze weitergeleitet.",
      });
      
      // Nach erfolgreicher Zahlung zur Bestätigungsseite weiterleiten
      setTimeout(() => {
        window.location.href = `/order-success?id=${orderId}&type=eventwaehrung`;
      }, 2000);
      
    } catch (error) {
      console.error("Fehler bei der Zahlungsverarbeitung:", error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <Link href="/produkte/partner" className="self-start text-[#0A3A68] hover:text-[#FF4C00] mb-4 inline-flex items-center transition-colors">
          <span className="material-icons mr-1">arrow_back</span>
          Zurück zur Auswahl
        </Link>
        <h1 className="babix-info-header text-3xl md:text-4xl font-bold mb-8 text-center">Eventwährung bestellen</h1>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Eventwährung für das aktuelle Event</CardTitle>
            <CardDescription>
              Geben Sie Ihre Daten ein und wählen Sie ein Währungspaket aus.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {formError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700">{formError}</p>
              </div>
            )}
            
            {/* Wenn PayPal angezeigt werden soll und eine Bestellnummer vorhanden ist */}
            {showPayPal && orderId ? (
              <div className="space-y-4">
                <div className="border-l-4 border-[#0A3A68] bg-blue-50 p-4 mb-4">
                  <h3 className="font-medium text-[#0A3A68]">Bestellung erfolgreich erstellt</h3>
                  <p>Bitte schließen Sie Ihre Zahlung ab, um Ihre Bestellung zu finanzieren.</p>
                </div>
                
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-xl mb-4">Zahlungsinformationen</h3>
                  <p className="mb-4 text-gray-600">Bestellnummer: {orderId}</p>
                  <p className="mb-6 text-gray-600">Betrag: {parseFloat(orderAmount).toFixed(2).replace('.', ',')} €</p>
                  
                  <div className="w-full max-w-md">
                    <PayPalButtonWrapper 
                      amount={orderAmount} 
                      currency="EUR"
                      intent="CAPTURE"
                      orderId={orderId}
                      onPaymentComplete={handlePaymentComplete}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Persönliche Daten */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Persönliche Daten</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-Mail <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="whatsapp">WhatsApp (optional)</Label>
                        <Input
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          className="mt-1"
                          placeholder="Für Rückfragen"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Währungs-Paket Auswahl */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Währungs-Paket</h3>
                    <RadioGroup
                      value={formData.selectedAmount}
                      onValueChange={(value) => handleSelectChange('selectedAmount', value)}
                      className="space-y-3"
                    >
                      {WAEHRUNG_PAKETE.map((paket) => (
                        <div key={paket.amount} className="flex items-center space-x-2">
                          <RadioGroupItem value={paket.amount} id={`amount-${paket.amount}`} />
                          <Label htmlFor={`amount-${paket.amount}`} className="cursor-pointer">
                            {paket.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  {/* Account-Informationen */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Account-Informationen</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="ingameName">Ingame-Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="ingameName"
                          name="accountInfo.ingameName"
                          value={formData.accountInfo.ingameName}
                          onChange={handleChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label>Anmeldemethode <span className="text-red-500">*</span></Label>
                        <RadioGroup
                          value={formData.accountInfo.authMethod}
                          onValueChange={(value) => handleRadioChange('accountInfo.authMethod', value)}
                          className="space-y-2 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="facebook" id="authFacebook" />
                            <Label htmlFor="authFacebook" className="cursor-pointer">Facebook Login</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="appleId" id="authAppleId" />
                            <Label htmlFor="authAppleId" className="cursor-pointer">Apple ID</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="authOther" />
                            <Label htmlFor="authOther" className="cursor-pointer">Andere</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <Label>Ausführungszeitpunkt <span className="text-red-500">*</span></Label>
                        <RadioGroup
                          value={formData.accountInfo.executionTime}
                          onValueChange={(value) => handleRadioChange('accountInfo.executionTime', value)}
                          className="space-y-2 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="automatic" id="timeAutomatic" />
                            <Label htmlFor="timeAutomatic" className="cursor-pointer">Automatisch (sobald möglich)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="coordination" id="timeCoordination" />
                            <Label htmlFor="timeCoordination" className="cursor-pointer">Nach Absprache</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rechtliche Hinweise */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Rechtliche Hinweise</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="agreedToTerms"
                          name="agreedToTerms"
                          checked={formData.agreedToTerms}
                          onChange={handleCheckboxChange}
                          className="mt-1 mr-2"
                          required
                        />
                        <Label htmlFor="agreedToTerms" className="cursor-pointer text-sm">
                          Ich habe die <a href="/agb" target="_blank" className="text-[#0A3A68] underline">AGB</a> und <a href="/datenschutz" target="_blank" className="text-[#0A3A68] underline">Datenschutzerklärung</a> gelesen und stimme diesen zu. <span className="text-red-500">*</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="agreedToWithdrawalNotice"
                          name="agreedToWithdrawalNotice"
                          checked={formData.agreedToWithdrawalNotice}
                          onChange={handleCheckboxChange}
                          className="mt-1 mr-2"
                          required
                        />
                        <Label htmlFor="agreedToWithdrawalNotice" className="cursor-pointer text-sm">
                          Ich stimme ausdrücklich zu, dass mit der Ausführung des Vertrags vor Ablauf der Widerrufsfrist begonnen wird und ich mein Widerrufsrecht verliere. <span className="text-red-500">*</span>
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Zusammenfassung und Bezahlbutton */}
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg">Gesamtpreis:</span>
                      <span className="text-xl font-bold text-[#FF4C00]">{parseFloat(orderAmount).toFixed(2).replace('.', ',')} €</span>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#FF4C00] hover:bg-[#0A3A68]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verarbeitung...
                        </>
                      ) : (
                        <>
                          <span className="material-icons mr-2 text-lg">shopping_cart</span>
                          Jetzt kostenpflichtig bestellen
                        </>
                      )}
                    </Button>
                    
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      * Pflichtfeld
                    </p>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}