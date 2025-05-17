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

export default function TycoonRacersCheckout() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [orderId, setOrderId] = useState<number | null>(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderAmount, setOrderAmount] = useState("25.00");

  // Parameter aus URL extrahieren (z.B. /checkout/tycoonracers?type=team&level=bronze)
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const typeParam = searchParams.get('type');
  const levelParam = searchParams.get('level');
  
  // Stelle sicher, dass die Parameter gültige Werte haben
  const validatedType = ['team', 'flags'].includes(typeParam || '') ? typeParam || 'team' : 'team';
  
  // Standardwerte für Level
  let validatedLevel = 'bronze';
  if (validatedType === 'team') {
    validatedLevel = ['bronze', 'silver', 'gold'].includes(levelParam || '') ? levelParam || 'bronze' : 'bronze';
  } else {
    validatedLevel = ['100', '250', '500'].includes(levelParam || '') ? levelParam || '100' : '100';
  }
  
  // State für Formular
  const [formError, setFormError] = useState('');
  
  // Initiale Form-Daten
  const getInitialFormData = () => {
    return {
      name: '',
      email: '',
      whatsapp: '',
      selectedType: validatedType,
      selectedLevel: validatedLevel,
      placeCount: '1',
      // Daten für jeden Platz
      places: [{
        ingameName: '',
        friendshipLink: ''
      }],
      agreedToTerms: false,
      agreedToWithdrawalNotice: false
    };
  };
  
  const [formData, setFormData] = useState(getInitialFormData());

  // Laden der Material Icons
  useEffect(() => {
    document.title = 'Tycoon Racers | babixGO';
    
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Aktualisiert den Bestellbetrag basierend auf der Auswahl
  useEffect(() => {
    let price;
    
    if (formData.selectedType === 'team') {
      // Preise für Teamplätze
      switch(formData.selectedLevel) {
        case 'bronze':
          price = 25;
          break;
        case 'silver':
          price = 45;
          break;
        case 'gold':
          price = 65;
          break;
        default:
          price = 25;
      }
    } else {
      // Preise für Flaggen
      switch(formData.selectedLevel) {
        case '100':
          price = 20;
          break;
        case '250':
          price = 40;
          break;
        case '500':
          price = 75;
          break;
        default:
          price = 20;
      }
    }
    
    // Multiplizieren mit der Anzahl der gekauften Plätze
    const totalPrice = (price * parseInt(formData.placeCount)).toFixed(2);
    setOrderAmount(totalPrice);
  }, [formData.selectedType, formData.selectedLevel, formData.placeCount]);

  // Funktion zur Handhabung von Formulareingaben
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Funktion zum Aktualisieren von Platzdaten
  const handlePlaceInputChange = (index: number, field: string, value: string) => {
    const updatedPlaces = [...formData.places];
    if (updatedPlaces[index]) {
      updatedPlaces[index] = {
        ...updatedPlaces[index],
        [field]: value
      };
    }
    setFormData({
      ...formData,
      places: updatedPlaces
    });
  };

  // Aktualisieren der Platzanzahl wenn sich die Auswahl ändert
  useEffect(() => {
    const placeCount = parseInt(formData.placeCount);
    const currentPlaces = [...formData.places];
    
    // Plätze hinzufügen oder entfernen, um die gewünschte Anzahl zu erreichen
    if (currentPlaces.length < placeCount) {
      // Plätze hinzufügen
      while (currentPlaces.length < placeCount) {
        currentPlaces.push({ ingameName: '', friendshipLink: '' });
      }
    } else if (currentPlaces.length > placeCount) {
      // Plätze entfernen
      currentPlaces.splice(placeCount);
    }
    
    setFormData({
      ...formData,
      places: currentPlaces
    });
  }, [formData.placeCount]);

  // Erzeugt eine strukturierte Order aus den Formulardaten
  const createOrderData = () => {
    return {
      // Persönliche Daten
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp || null,
      
      // Bestelldetails
      productType: 'tycoonracers',
      package: `${formData.selectedType === 'team' ? 'Team ' + formData.selectedLevel : formData.selectedLevel + ' Flaggen'} x${formData.placeCount}`,
      price: parseFloat(orderAmount),
      
      // Platzdaten als JSON
      accountData: JSON.stringify({
        type: formData.selectedType,
        level: formData.selectedLevel,
        places: formData.places
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
    
    // Validiere Platzdaten
    const isPlaceDataValid = formData.places.every(place => 
      place.ingameName.trim() !== '' && place.friendshipLink.trim() !== ''
    );
    
    if (!isPlaceDataValid) {
      setFormError('Bitte füllen Sie für jeden Platz alle Felder aus.');
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

  // Helper für Beschreibungen
  const getLevelDescription = () => {
    if (formData.selectedType === 'team') {
      switch(formData.selectedLevel) {
        case 'bronze':
          return 'Bronze-Teamplatz (25,00 € pro Platz)';
        case 'silver':
          return 'Silber-Teamplatz (45,00 € pro Platz)';
        case 'gold':
          return 'Gold-Teamplatz (65,00 € pro Platz)';
        default:
          return 'Teamplatz';
      }
    } else {
      switch(formData.selectedLevel) {
        case '100':
          return '100 Flaggen (20,00 € pro Paket)';
        case '250':
          return '250 Flaggen (40,00 € pro Paket)';
        case '500':
          return '500 Flaggen (75,00 € pro Paket)';
        default:
          return 'Flaggenpaket';
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-['Nunito_Sans'] text-[#0A3A68]">
      <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto my-4 border-b-2 border-[#00CFFF] text-[#FF4C00] babix-info-header">
        Tycoon Racers buchen
      </h1>
      
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        {/* Eventtyp auswählen */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons text-[#00CFFF]">category</span>
              Eventtyp auswählen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue={formData.selectedType}
              onValueChange={(value) => {
                // Beim Wechsel des Typs müssen wir auch das Level anpassen
                const newLevel = value === 'team' ? 'bronze' : '100';
                setFormData({
                  ...formData,
                  selectedType: value as 'team' | 'flags',
                  selectedLevel: newLevel
                });
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedType === 'team' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="team" id="type-team" className="text-[#00CFFF]" />
                <Label htmlFor="type-team" className="w-full cursor-pointer">
                  <div className="font-medium">Teamplatz</div>
                  <div className="text-sm text-gray-500">Buchen Sie einen Platz in unserem Team</div>
                </Label>
              </div>
              
              <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedType === 'flags' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                <RadioGroupItem value="flags" id="type-flags" className="text-[#00CFFF]" />
                <Label htmlFor="type-flags" className="w-full cursor-pointer">
                  <div className="font-medium">Flaggen</div>
                  <div className="text-sm text-gray-500">Kaufen Sie Flaggenpakete für das Event</div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        {/* Level oder Flaggenmenge auswählen */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons text-[#00CFFF]">{formData.selectedType === 'team' ? 'military_tech' : 'flag'}</span>
              {formData.selectedType === 'team' ? 'Teamlevel auswählen' : 'Flaggenmenge auswählen'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formData.selectedType === 'team' ? (
              <RadioGroup 
                defaultValue={formData.selectedLevel}
                value={formData.selectedLevel}
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    selectedLevel: value
                  });
                }}
                className="grid gap-4"
              >
                <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedLevel === 'bronze' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <RadioGroupItem value="bronze" id="level-bronze" className="text-[#00CFFF]" />
                  <Label htmlFor="level-bronze" className="w-full cursor-pointer flex justify-between">
                    <span className="font-medium">Bronze</span>
                    <span className="font-bold text-[#FF4C00]">25,00 €</span>
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedLevel === 'silver' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <RadioGroupItem value="silver" id="level-silver" className="text-[#00CFFF]" />
                  <Label htmlFor="level-silver" className="w-full cursor-pointer flex justify-between">
                    <span className="font-medium">Silber</span>
                    <span className="font-bold text-[#FF4C00]">45,00 €</span>
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedLevel === 'gold' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <RadioGroupItem value="gold" id="level-gold" className="text-[#00CFFF]" />
                  <Label htmlFor="level-gold" className="w-full cursor-pointer flex justify-between">
                    <span className="font-medium">Gold</span>
                    <span className="font-bold text-[#FF4C00]">65,00 €</span>
                  </Label>
                </div>
              </RadioGroup>
            ) : (
              <RadioGroup 
                defaultValue={formData.selectedLevel}
                value={formData.selectedLevel}
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    selectedLevel: value
                  });
                }}
                className="grid gap-4"
              >
                <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedLevel === '100' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <RadioGroupItem value="100" id="flags-100" className="text-[#00CFFF]" />
                  <Label htmlFor="flags-100" className="w-full cursor-pointer flex justify-between">
                    <span className="font-medium">100 Flaggen</span>
                    <span className="font-bold text-[#FF4C00]">20,00 €</span>
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedLevel === '250' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <RadioGroupItem value="250" id="flags-250" className="text-[#00CFFF]" />
                  <Label htmlFor="flags-250" className="w-full cursor-pointer flex justify-between">
                    <span className="font-medium">250 Flaggen</span>
                    <span className="font-bold text-[#FF4C00]">40,00 €</span>
                  </Label>
                </div>
                
                <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedLevel === '500' ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <RadioGroupItem value="500" id="flags-500" className="text-[#00CFFF]" />
                  <Label htmlFor="flags-500" className="w-full cursor-pointer flex justify-between">
                    <span className="font-medium">500 Flaggen</span>
                    <span className="font-bold text-[#FF4C00]">75,00 €</span>pan>
                  </Label>
                </div>
              </RadioGroup>
            )}
          </CardContent>
        </Card>
        
        {/* Anzahl der Plätze */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <span className="material-icons text-[#00CFFF]">people</span>
              {formData.selectedType === 'team' ? 'Anzahl der Teamplätze' : 'Anzahl der Flaggenpakete'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue="1"
              value={formData.placeCount}
              onValueChange={(value) => {
                setFormData({
                  ...formData,
                  placeCount: value
                });
              }}
              className="grid grid-cols-2 sm:grid-cols-5 gap-4"
            >
              {[1, 2, 3, 5, 10].map((count) => (
                <div 
                  key={count}
                  className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.placeCount === count.toString() ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <RadioGroupItem value={count.toString()} id={`count-${count}`} className="text-[#00CFFF]" />
                  <Label htmlFor={`count-${count}`} className="cursor-pointer">{count}</Label>
                </div>
              ))}
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
            <div className="text-sm text-gray-600 mt-1">
              {formData.placeCount === '1' 
                ? 'Geben Sie Ihren Spielernamen und Freundschaftslink ein' 
                : `Geben Sie für alle ${formData.placeCount} ${formData.selectedType === 'team' ? 'Teamplätze' : 'Flaggenpakete'} die benötigten Informationen ein`}
            </div>
          </CardHeader>
          <CardContent>
            {formData.places.map((place, index) => (
              <div key={index} className="mb-6">
                {formData.placeCount !== '1' && (
                  <h3 className="font-medium text-lg mb-3 pb-2 border-b">
                    {formData.selectedType === 'team' ? 'Teamplatz' : 'Flaggenpaket'} {index + 1}: {getLevelDescription()}
                  </h3>
                )}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`ingameName-${index}`} className="mb-1 block">Spielername *</Label>
                    <Input 
                      id={`ingameName-${index}`}
                      placeholder="Ihr Name im Spiel" 
                      value={place.ingameName} 
                      onChange={(e) => handlePlaceInputChange(index, 'ingameName', e.target.value)} 
                      required
                      className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`friendshipLink-${index}`} className="mb-1 block flex items-center">
                      Freundschaftslink oder Code *
                      <span className="text-xs text-gray-500 ml-2">Für die Einladung</span>
                    </Label>
                    <Input 
                      id={`friendshipLink-${index}`}
                      placeholder="Ihr Freundschaftslink oder Code" 
                      value={place.friendshipLink} 
                      onChange={(e) => handlePlaceInputChange(index, 'friendshipLink', e.target.value)} 
                      required
                      className="border-[#00CFFF]/30 focus:border-[#00CFFF] focus:ring-[#00CFFF]"
                    />
                  </div>
                </div>
              </div>
            ))}
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
                  <span>
                    {formData.placeCount} x {formData.selectedType === 'team' 
                      ? `Teamplatz (${formData.selectedLevel})` 
                      : `${formData.selectedLevel} Flaggen`
                    }
                  </span>
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