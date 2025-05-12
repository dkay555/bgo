import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { PricingCard } from '@/components/PricingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


export default function WuerfelCheckout() {
  // URL-Parameter auslesen
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  
  // Direkter Test der Parameterwerte im Konsolenprotokoll
  console.log("Vollständige URL:", location);
  console.log("Query-Teil:", location.split('?')[1] || 'keine Query');
  console.log("Alle Parameter:", Object.fromEntries(searchParams.entries()));
  
  // Parameter für das Würfelpaket
  const packageParam = searchParams.get('package');
  
  // Stelle sicher, dass der Parameter einer der erlaubten Werte ist
  const validatedPackage = ['25000', '35000', '45000'].includes(packageParam || '') 
    ? packageParam 
    : '25000';
  
  // State für Formular mit reduziertem Beispiel-Code
  const [authMethod, setAuthMethod] = useState('authtoken');
  
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

  // Funktion zur Handhabung der Formularübermittlung
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formular übermittelt:', formData);
    // Hier würde die tatsächliche Checkout-Logik implementiert werden
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-['Nunito_Sans'] text-[#0A3A68]">
      <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mx-auto my-4 border-b-2 border-[#00CFFF] text-[#FF4C00] babix-info-header">
        Würfel kaufen
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Linke Spalte - Produktauswahl */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Ihr Würfelpaket</CardTitle>
              <CardDescription>Ausgewählte Würfelmenge und Preis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-[#00CFFF]/10 p-6 rounded-md text-center mb-6">
                <h3 className="text-2xl font-bold babix-info-header text-[#0A3A68] mb-2">
                  {formData.selectedPackage === "25000" && "25.000 Würfel"}
                  {formData.selectedPackage === "35000" && "35.000 Würfel"}
                  {formData.selectedPackage === "45000" && "45.000 Würfel"}
                </h3>
                <p className="text-3xl font-bold text-[#FF4C00]">
                  {formData.selectedPackage === "25000" && "25€"}
                  {formData.selectedPackage === "35000" && "35€"}
                  {formData.selectedPackage === "45000" && "45€"}
                </p>
                <div className="text-sm text-gray-600 mt-3">
                  Paket-ID: {formData.selectedPackage}
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mt-6">
                <h4 className="babix-info-header text-[#0A3A68] mb-2 flex items-center">
                  <span className="material-icons text-yellow-500 mr-2">info</span>
                  Hinweis
                </h4>
                <p className="text-sm mb-2">
                  Falls Sie ein anderes Würfelpaket wünschen, kehren Sie zur <Link href="/produkte/wuerfel" className="text-[#00CFFF] hover:underline">Produktseite</Link> zurück.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Rechte Spalte - Authentifizierung */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Authentifizierung</CardTitle>
              <CardDescription>Wählen Sie Ihre bevorzugte Authentifizierungsmethode</CardDescription>
              <div className="mt-3 p-3 bg-[#00CFFF]/10 rounded-md border border-[#00CFFF]/20">
                <p className="text-sm">
                  Informationen zu den Möglichkeiten der Authentifizierung gibt es hier: <Link href="/hilfe/login" className="text-[#00CFFF] hover:underline">Hilfsartikel zum Login</Link>
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="authtoken" onValueChange={handleAuthMethodChange}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="authtoken">Authtoken</TabsTrigger>
                  <TabsTrigger value="login">Facebook Zugangsdaten</TabsTrigger>
                </TabsList>
                
                <TabsContent value="authtoken">
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Würfelmengenauswahl */}
                    <div className="bg-[#0A3A68]/5 p-4 rounded-lg mb-6">
                      <h4 className="babix-info-header text-[#0A3A68] mb-4 flex items-center">
                        <span className="material-icons text-[#00CFFF] mr-2">sports_score</span>
                        Würfelmenge auswählen
                      </h4>
                      
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
                        <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedPackage === "25000" ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200'}`}>
                          <RadioGroupItem value="25000" id="r-25000" className="text-[#00CFFF]" />
                          <Label htmlFor="r-25000" className="w-full cursor-pointer flex justify-between">
                            <span>25.000 Würfel</span>
                            <span className="font-bold text-[#FF4C00]">25€</span>
                          </Label>
                        </div>
                        
                        <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedPackage === "35000" ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200'}`}>
                          <RadioGroupItem value="35000" id="r-35000" className="text-[#00CFFF]" />
                          <Label htmlFor="r-35000" className="w-full cursor-pointer flex justify-between">
                            <span>35.000 Würfel</span>
                            <span className="font-bold text-[#FF4C00]">35€</span>
                          </Label>
                        </div>
                        
                        <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedPackage === "45000" ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200'}`}>
                          <RadioGroupItem value="45000" id="r-45000" className="text-[#00CFFF]" />
                          <Label htmlFor="r-45000" className="w-full cursor-pointer flex justify-between">
                            <span>45.000 Würfel</span>
                            <span className="font-bold text-[#FF4C00]">45€</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-[#00CFFF]/10 p-4 rounded-lg mb-6">
                      <h4 className="babix-info-header text-[#0A3A68] mb-2 flex items-center">
                        <span className="material-icons text-[#00CFFF] mr-2">person</span>
                        Persönliche Daten
                      </h4>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="name">Vor- und Nachname</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Ihr vollständiger Name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="email">E-Mail-Adresse</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="ihre.email@beispiel.de" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="whatsapp">WhatsApp (freiwillig)</Label>
                        <Input 
                          id="whatsapp" 
                          name="whatsapp" 
                          placeholder="Für mögliche Rückfragen" 
                          value={formData.whatsapp} 
                          onChange={handleInputChange} 
                        />
                        <p className="text-xs text-gray-500 mt-1">Für mögliche Rückfragen, ansonsten nutzen wir Ihre E-Mail-Adresse</p>
                      </div>
                    </div>
                    
                    <div className="bg-[#00CFFF]/10 p-4 rounded-lg">
                      <h4 className="babix-info-header text-[#0A3A68] mb-2 flex items-center">
                        <span className="material-icons text-[#00CFFF] mr-2">key</span>
                        Authtoken
                      </h4>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="ingameName">Ingame Name</Label>
                        <Input 
                          id="ingameName" 
                          name="ingameName" 
                          placeholder="Ihr Name im Spiel" 
                          value={formData.ingameName} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="authtoken">
                          Authtoken 
                          <span className="text-xs text-gray-500 ml-2">
                            <Link href="/hilfe/login#authtoken" className="text-[#00CFFF] hover:underline">
                              (Wie bekomme ich den Authtoken?)
                            </Link>
                          </span>
                        </Label>
                        <Input 
                          id="authtoken" 
                          name="authtoken" 
                          placeholder="Ihr Authtoken aus der App" 
                          value={formData.authtoken} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                    </div>
                    

                  </form>
                </TabsContent>
                
                <TabsContent value="login">
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Würfelmengenauswahl */}
                    <div className="bg-[#0A3A68]/5 p-4 rounded-lg mb-6">
                      <h4 className="babix-info-header text-[#0A3A68] mb-4 flex items-center">
                        <span className="material-icons text-[#00CFFF] mr-2">sports_score</span>
                        Würfelmenge auswählen
                      </h4>
                      
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
                        <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedPackage === "25000" ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200'}`}>
                          <RadioGroupItem value="25000" id="r2-25000" className="text-[#00CFFF]" />
                          <Label htmlFor="r2-25000" className="w-full cursor-pointer flex justify-between">
                            <span>25.000 Würfel</span>
                            <span className="font-bold text-[#FF4C00]">25€</span>
                          </Label>
                        </div>
                        
                        <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedPackage === "35000" ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200'}`}>
                          <RadioGroupItem value="35000" id="r2-35000" className="text-[#00CFFF]" />
                          <Label htmlFor="r2-35000" className="w-full cursor-pointer flex justify-between">
                            <span>35.000 Würfel</span>
                            <span className="font-bold text-[#FF4C00]">35€</span>
                          </Label>
                        </div>
                        
                        <div className={`flex items-center space-x-2 p-4 rounded-lg border ${formData.selectedPackage === "45000" ? 'bg-[#00CFFF]/10 border-2 border-[#00CFFF]' : 'border-gray-200'}`}>
                          <RadioGroupItem value="45000" id="r2-45000" className="text-[#00CFFF]" />
                          <Label htmlFor="r2-45000" className="w-full cursor-pointer flex justify-between">
                            <span>45.000 Würfel</span>
                            <span className="font-bold text-[#FF4C00]">45€</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="bg-[#00CFFF]/10 p-4 rounded-lg mb-6">
                      <h4 className="babix-info-header text-[#0A3A68] mb-2 flex items-center">
                        <span className="material-icons text-[#00CFFF] mr-2">person</span>
                        Persönliche Daten
                      </h4>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="name">Vor- und Nachname</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Ihr vollständiger Name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="email">E-Mail-Adresse</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="ihre.email@beispiel.de" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="whatsapp">WhatsApp (freiwillig)</Label>
                        <Input 
                          id="whatsapp" 
                          name="whatsapp" 
                          placeholder="Für mögliche Rückfragen" 
                          value={formData.whatsapp} 
                          onChange={handleInputChange} 
                        />
                        <p className="text-xs text-gray-500 mt-1">Für mögliche Rückfragen, ansonsten nutzen wir Ihre E-Mail-Adresse</p>
                      </div>
                    </div>
                    
                    <div className="bg-[#00CFFF]/10 p-4 rounded-lg">
                      <h4 className="babix-info-header text-[#0A3A68] mb-2 flex items-center">
                        <span className="material-icons text-[#00CFFF] mr-2">facebook</span>
                        Facebook Zugangsdaten
                      </h4>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="loginIngameName">Ingame Name</Label>
                        <Input 
                          id="loginIngameName" 
                          name="loginIngameName" 
                          placeholder="Ihr Name im Spiel" 
                          value={formData.loginIngameName} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="loginEmail">Email / Handynummer</Label>
                        <Input 
                          id="loginEmail" 
                          name="loginEmail" 
                          placeholder="Ihre Facebook Email oder Handynummer" 
                          value={formData.loginEmail} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="password">Passwort</Label>
                        <Input 
                          id="password" 
                          name="password" 
                          type="password" 
                          placeholder="Ihr Facebook Passwort" 
                          value={formData.password} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="recoveryCode1">Wiederherstellungscode 1</Label>
                          <Input 
                            id="recoveryCode1" 
                            name="recoveryCode1" 
                            placeholder="Wiederherstellungscode 1" 
                            value={formData.recoveryCode1} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recoveryCode2">Wiederherstellungscode 2</Label>
                          <Input 
                            id="recoveryCode2" 
                            name="recoveryCode2" 
                            placeholder="Wiederherstellungscode 2" 
                            value={formData.recoveryCode2} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mt-6">
                      <h4 className="babix-info-header text-[#0A3A68] mb-2 flex items-center">
                        <span className="material-icons text-yellow-500 mr-2">warning</span>
                        Wichtiger Hinweis
                      </h4>
                      <p className="text-sm">
                        Bitte stellen Sie sicher, dass alle Ihre Login-Daten korrekt sind. Wir benötigen diese Informationen, 
                        um sicher auf Ihren Account zugreifen zu können.
                      </p>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col items-start w-full">
              {/* Hinweise zum Widerrufsrecht und AGB */}
              <div className="w-full space-y-4 mb-6">
                {/* Einfach nur direkt die Checkboxen verwenden */}
                <div className="flex items-start space-x-2 border border-[#00CFFF]/30 rounded-md p-3 hover:bg-[#00CFFF]/5">
                  <input 
                    type="checkbox" 
                    id="withdrawalCheck"
                    className="h-4 w-4 mt-1 accent-[#00CFFF]"
                    checked={formData.agreedToWithdrawalNotice}
                    onChange={() => {
                      // Separater State nur für diese Checkbox
                      const newValue = !formData.agreedToWithdrawalNotice;
                      setFormData({
                        ...formData,
                        agreedToWithdrawalNotice: newValue
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
                
                {/* Zweite Checkbox */}
                <div className="flex items-start space-x-2 border border-[#00CFFF]/30 rounded-md p-3 hover:bg-[#00CFFF]/5 mt-4">
                  <input 
                    type="checkbox" 
                    id="termsCheck"
                    className="h-4 w-4 mt-1 accent-[#00CFFF]"
                    checked={formData.agreedToTerms}
                    onChange={() => {
                      // Separater State nur für diese Checkbox
                      const newValue = !formData.agreedToTerms;
                      setFormData({
                        ...formData,
                        agreedToTerms: newValue
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
              </div>
              
              <Button type="submit" className="w-full bg-[#FF4C00] hover:bg-[#FF4C00]/80 text-white font-bold">
                Jetzt kaufen
              </Button>
              
              <div className="text-sm text-gray-500 mt-6 w-full">
                <p className="flex items-start">
                  <span className="material-icons text-[#00CFFF] mr-2 text-sm">security</span>
                  Ihre Daten werden sicher übermittelt und verschlüsselt gespeichert
                </p>
                <p className="flex items-start mt-2">
                  <span className="material-icons text-[#00CFFF] mr-2 text-sm">support_agent</span>
                  Bei Fragen kontaktieren Sie uns gerne über <Link href="https://wa.me/4915223842897" className="text-[#00CFFF] hover:underline">WhatsApp</Link> oder <Link href="mailto:support@babixgo.de" className="text-[#00CFFF] hover:underline">E-Mail</Link>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}