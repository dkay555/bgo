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
      authMethod: "friendshipLink", // Korrekter Wert für die gewählte Methode
      ingameName: formData.ingameName,
      friendshipLink: formData.friendshipLink,
      accountData: JSON.stringify({
        friendshipLink: formData.friendshipLink
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
        console.error("Bestellungsfehler:", errorData);
        throw new Error(errorData.message || (errorData.errors && errorData.errors.length > 0 ? errorData.errors[0].message : "Fehler beim Erstellen der Bestellung"));
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
      console.log("Aktualisiere Zahlungsstatus für Bestellung", orderId, "mit PayPal-ID", paymentId);
      
      const response = await apiRequest("PATCH", `/api/orders/${orderId}/payment`, {
        paymentStatus: "completed",
        paymentReference: paymentId
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Zahlungsaktualisierung fehlgeschlagen:", errorData);
        throw new Error(errorData.message || "Fehler beim Aktualisieren des Zahlungsstatus");
      }

      // Warenkorb leeren nach erfolgreicher Zahlung
      clearCart();
      
      toast({
        title: "Zahlung erfolgreich",
        description: "Vielen Dank für Ihren Einkauf! Wir bearbeiten Ihre Bestellung umgehend.",
      });

      // Weiterleitung zur Startseite nach 3 Sekunden
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error: any) {
      console.error("Zahlungsaktualisierung Fehler:", error);
      toast({
        title: "Fehler",
        description: error.message || "Fehler beim Aktualisieren des Zahlungsstatus",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-['Nunito_Sans'] text-[#0A3A68]">
      <div className="mb-8 text-center">
        <h1 className="babixgoheader font-bold text-3xl md:text-4xl mb-2 text-[#0A3A68]">
          Sticker bestellen
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Vervollständige deine Monopoly Go Sticker-Sammlung mit unseren individuellen Angeboten
        </p>
      </div>

      {/* Login/Register Hinweis */}
      <div className="bg-gradient-to-r from-[#0A3A68]/10 to-[#00CFFF]/10 p-4 rounded-lg mb-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="material-icons text-[#00CFFF]">account_circle</span>
          <div>
            <p className="font-medium">Bereits Kunde? <Link href="/auth" className="text-[#00CFFF] hover:underline">Hier einloggen</Link></p>
            <p className="text-sm text-gray-600">Oder <Link href="/auth" className="text-[#00CFFF] hover:underline">neues Konto erstellen</Link> für schnellere Bestellungen in Zukunft</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        {/* Sticker Auswahl anzeigen */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-[#0A3A68] to-[#0A3A68]/80 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="material-icons">shopping_cart</span>
              Warenkorb
            </h2>
          </div>
          <CardContent className="p-6">
            {cartItems.length === 0 ? (
              <div className="p-6 bg-gray-50 rounded-md text-center">
                <div className="text-gray-400 text-5xl mb-4">
                  <span className="material-icons" style={{ fontSize: '4rem' }}>shopping_cart</span>
                </div>
                <p className="text-gray-500 mb-4">Du hast noch keine Sticker ausgewählt.</p>
                <Link href="/shop/sticker">
                  <Button className="mx-auto bg-[#00CFFF] hover:bg-[#00CFFF]/80">
                    <span className="material-icons mr-2">add_shopping_cart</span>
                    Sticker auswählen
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Deine ausgewählten Sticker:</h3>
                  <div className="max-h-[300px] overflow-y-auto border border-gray-200 rounded-md shadow-sm divide-y">
                    {cartItems.map((item, index) => (
                      <div key={index} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <p className="font-medium text-[#0A3A68]">{item.name}</p>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600 mr-2">Set {Math.ceil(item.id / 9)}</span>
                            <div className="flex mr-2">
                              {[...Array(item.stars)].map((_, i) => (
                                <span key={i} className="material-icons text-yellow-500 text-sm">star</span>
                              ))}
                            </div>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                              {item.isGold ? 'Goldsticker' : 'Standard'}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-[#FF4C00] text-lg">
                          {calculatePrice(item).toFixed(2).replace('.', ',')} €
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FF4C00]/10 p-5 rounded-md shadow-sm border border-[#FF4C00]/20">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Gesamtbetrag:</span>
                    <span className="font-bold text-[#FF4C00] text-xl">{totalPrice.toFixed(2).replace('.', ',')} €</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Link href="/shop/sticker">
                    <Button variant="outline" className="flex items-center gap-1">
                      <span className="material-icons text-sm">arrow_back</span>
                      Zurück zum Shop
                    </Button>
                  </Link>

                  <div className="text-xs text-gray-500">
                    Alle Preise inklusive MwSt.
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Persönliche Daten */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/80 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="material-icons">person</span>
              Persönliche Daten
            </h2>
          </div>
          <CardContent className="p-6">
            <div className="grid gap-5">
              <div>
                <Label htmlFor="name" className="text-[#0A3A68] font-medium mb-2 block">Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Dein vollständiger Name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required
                  className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF] p-2.5 rounded-md"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-[#0A3A68] font-medium mb-2 block">E-Mail *</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <span className="material-icons text-sm">email</span>
                  </span>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="deine.email@beispiel.de" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required
                    className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF] p-2.5 pl-10 rounded-md"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="whatsapp" className="text-[#0A3A68] font-medium mb-2 flex items-center">
                  WhatsApp (optional)
                  <span className="text-xs text-gray-500 ml-2 bg-gray-100 px-2 py-1 rounded-full">Für schnellere Kommunikation</span>
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <span className="material-icons text-sm">whatsapp</span>
                  </span>
                  <Input 
                    id="whatsapp" 
                    name="whatsapp" 
                    placeholder="Deine WhatsApp-Nummer" 
                    value={formData.whatsapp} 
                    onChange={handleInputChange}
                    className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF] p-2.5 pl-10 rounded-md"
                  />
                </div>
              </div>

              <div className="bg-[#00CFFF]/5 p-4 rounded-md mt-2 border border-[#00CFFF]/10">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-[#0A3A68]">Datenschutzhinweis:</span> Deine Daten werden vertraulich behandelt und nur für die Bearbeitung deiner Bestellung verwendet.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monopoly-Account-Daten */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-[#FF4C00] to-[#FF4C00]/80 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="material-icons">videogame_asset</span>
              Monopoly-Daten
            </h2>
          </div>
          <CardContent className="p-6">
            <div className="space-y-5">
              <div>
                <Label htmlFor="ingameName" className="text-[#0A3A68] font-medium mb-2 block">Spielername *</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <span className="material-icons text-sm">person_pin</span>
                  </span>
                  <Input 
                    id="ingameName" 
                    name="ingameName" 
                    placeholder="Dein Name im Spiel" 
                    value={formData.ingameName} 
                    onChange={handleInputChange} 
                    required
                    className="border-[#FF4C00]/30 focus:border-[#FF4C00] focus:ring-[#FF4C00] p-2.5 pl-10 rounded-md"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="friendshipLink" className="text-[#0A3A68] font-medium mb-2 flex items-center">
                  Freundschaftslink oder Code *
                  <span className="text-xs text-gray-500 ml-2 bg-gray-100 px-2 py-1 rounded-full">Für die Stickerlieferung</span>
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <span className="material-icons text-sm">link</span>
                  </span>
                  <Input 
                    id="friendshipLink" 
                    name="friendshipLink" 
                    placeholder="Dein Freundschaftslink oder Code" 
                    value={formData.friendshipLink} 
                    onChange={handleInputChange} 
                    required
                    className="border-[#FF4C00]/30 focus:border-[#FF4C00] focus:ring-[#FF4C00] p-2.5 pl-10 rounded-md"
                  />
                </div>
                <div className="mt-3 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                  <p className="text-sm text-gray-700 flex items-start">
                    <span className="material-icons text-yellow-500 mr-2 text-lg">info</span>
                    <span>Du findest deinen Freundschaftslink im Spiel unter <strong>Freunde → Freunde hinzufügen</strong></span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkboxen für AGBs und Widerrufsrecht */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-[#0A3A68] to-[#00CFFF] p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="material-icons">gavel</span>
              Rechtliche Hinweise
            </h2>
          </div>
          <CardContent className="p-6">
            {/* Checkbox für Widerrufsrecht */}
            <div 
              className={`flex items-start p-4 rounded-lg border ${formData.agreedToWithdrawalNotice ? 'bg-[#00CFFF]/10 border-[#00CFFF]' : 'border-gray-200'} mb-5 transition-all hover:shadow-sm cursor-pointer`}
              onClick={(e) => {
                e.preventDefault();
                const newValue = !formData.agreedToWithdrawalNotice;
                setFormData({
                  ...formData,
                  agreedToWithdrawalNotice: newValue
                });
              }}
            >
              <div className="flex-shrink-0 mt-1 mr-3">
                <input 
                  type="checkbox" 
                  id="withdrawalCheck"
                  className="h-5 w-5 accent-[#00CFFF] cursor-pointer"
                  checked={formData.agreedToWithdrawalNotice}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    setFormData({
                      ...formData,
                      agreedToWithdrawalNotice: newValue
                    });
                  }}
                />
              </div>
              <label 
                htmlFor="withdrawalCheck" 
                className="text-sm cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="font-medium block mb-1 text-[#0A3A68]">Widerrufsbelehrung</span>
                Ich bin ausdrücklich damit einverstanden, dass mit der Ausführung des Auftrags vor Ablauf der Widerrufsfrist begonnen wird. Mir ist bekannt, dass mein <Link href="/widerruf" className="text-[#00CFFF] hover:underline inline-flex items-center" target="_blank">Widerrufsrecht <span className="material-icons text-xs ml-0.5">open_in_new</span></Link> mit Beginn der Ausführung erlischt.
              </label>
            </div>

            {/* Checkbox für AGB */}
            <div 
              className={`flex items-start p-4 rounded-lg border ${formData.agreedToTerms ? 'bg-[#00CFFF]/10 border-[#00CFFF]' : 'border-gray-200'} mb-5 transition-all hover:shadow-sm cursor-pointer`}
              onClick={(e) => {
                e.preventDefault();
                const newValue = !formData.agreedToTerms;
                setFormData({
                  ...formData,
                  agreedToTerms: newValue
                });
              }}
            >
              <div className="flex-shrink-0 mt-1 mr-3">
                <input 
                  type="checkbox" 
                  id="termsCheck"
                  className="h-5 w-5 accent-[#00CFFF] cursor-pointer"
                  checked={formData.agreedToTerms}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    setFormData({
                      ...formData,
                      agreedToTerms: newValue
                    });
                  }}
                />
              </div>
              <label 
                htmlFor="termsCheck" 
                className="text-sm cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="font-medium block mb-1 text-[#0A3A68]">AGB & Datenschutz</span>
                Ich habe die <Link href="/agb" className="text-[#00CFFF] hover:underline" target="_blank">Allgemeinen Geschäftsbedingungen</Link> und <Link href="/datenschutz" className="text-[#00CFFF] hover:underline" target="_blank">Datenschutzbestimmungen</Link> gelesen und akzeptiere diese.
              </label>
            </div>

            {/* Fehlermeldung */}
            {formError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-start">
                <span className="material-icons text-red-500 mr-2">error_outline</span>
                <span>{formError}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Zahlung */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-[#FF4C00] to-[#FF4C00]/80 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="material-icons">payments</span>
              Bezahlung
            </h2>
          </div>
          <CardContent className="p-6">
            {/* Wenn wir noch keine Bestellung erstellt haben, zeigen wir den Bestellbutton an */}
            {!showPayPal ? (
              <div className="space-y-6">
                <div className="bg-[#FF4C00]/5 p-5 rounded-lg border border-[#FF4C00]/20 text-center">
                  <p className="text-[#0A3A68] font-medium">
                    Gesamtbetrag: <span className="text-xl font-bold text-[#FF4C00] ml-2">{totalPrice.toFixed(2).replace('.', ',')} €</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Alle Preise inkl. MwSt.</p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#FF4C00] hover:bg-[#FF4C00]/90 text-white font-bold py-4 text-lg rounded-md shadow-sm"
                  disabled={isSubmitting || cartItems.length === 0}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Wird verarbeitet...
                    </span>
                  ) : cartItems.length === 0 ? (
                    'Bitte wähle zuerst Sticker aus'
                  ) : (
                    <span className="flex items-center justify-center">
                      <span className="material-icons mr-2">shopping_cart_checkout</span>
                      Jetzt bestellen
                    </span>
                  )}
                </Button>

                <div className="flex justify-center space-x-4 items-center">
                  <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-6" />
                  <div className="relative flex-1">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300"></span>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-2 text-gray-500">Bezahle sicher mit</span>
                    </div>
                  </div>
                  <img src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png" alt="Bank Transfer" className="h-6" />
                </div>
              </div>
            ) : (
              /* Wenn wir eine Bestellung erstellt haben, zeigen wir die PayPal-Zahlung an */
              <div className="space-y-6">
                <div className="bg-green-50 p-4 border border-green-200 rounded-lg mb-2 text-center">
                  <span className="material-icons text-green-500 text-2xl mb-2">check_circle</span>
                  <h3 className="font-bold text-lg text-[#0A3A68] mb-2">Bestellung erfolgreich erstellt!</h3>
                  <p className="text-gray-700">Bitte schließe deine Bestellung mit der Zahlung ab.</p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="font-medium text-[#0A3A68] mb-3 pb-2 border-b">Bestellübersicht</h3>

                  {cartItems.length > 0 ? (
                    <div className="space-y-2 mb-4">
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{item.name} ({item.stars}★)</span>
                          <span className="font-medium">{calculatePrice(item).toFixed(2).replace('.', ',')} €</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center font-bold text-lg">
                        <span>Gesamt:</span>
                        <span className="text-[#FF4C00]">{orderAmount.replace('.', ',')}€</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-3 px-4 border border-gray-200 rounded-lg mb-4">
                      <div className="flex justify-between items-center mb-2 border-b pb-2">
                        <span className="font-medium">Produkt:</span>
                        <span>Sticker Set {formData.selectedSet}</span>
                      </div>
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Gesamt:</span>
                        <span className="text-[#FF4C00]">{orderAmount.replace('.', ',')}€</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mb-4 flex items-start">
                    <span className="material-icons text-blue-500 mr-2">info</span>
                    <p className="text-sm text-gray-700">
                      Nach erfolgreicher Zahlung erhältst du eine Bestätigungs-E-Mail mit deinen Bestelldetails.
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="w-full mx-auto rounded-md overflow-hidden shadow-sm border border-gray-200">
                      <PayPalButtonWrapper 
                        amount={orderAmount} 
                        currency="EUR" 
                        intent="CAPTURE" 
                        orderId={orderId ?? undefined}
                        onPaymentComplete={updateOrderPayment}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-500">
                  <p>Hast du Fragen zu deiner Bestellung? <Link href="/kontakt" className="text-[#00CFFF] hover:underline">Kontaktiere uns</Link></p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}