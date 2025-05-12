import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { PricingCard } from '@/components/PricingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function WuerfelCheckout() {
  // State für Formular
  const [authMethod, setAuthMethod] = useState('authtoken');
  const [formData, setFormData] = useState({
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
    selectedPackage: '25000',
    agreedToTerms: false,
    agreedToWithdrawalNotice: false
  });

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
              <CardTitle>Würfelpaket auswählen</CardTitle>
              <CardDescription>Wählen Sie Ihr gewünschtes Würfelpaket</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                defaultValue="25000" 
                name="selectedPackage" 
                onValueChange={(value) => setFormData({...formData, selectedPackage: value})}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value="25000" id="r1" />
                  <Label htmlFor="r1" className="flex-1">
                    <div className="bg-[#00CFFF]/10 p-3 rounded-md">
                      <h4 className="babix-info-header text-[#0A3A68]">25.000 Würfel</h4>
                      <p className="text-xl font-bold text-[#FF4C00]">25€</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value="35000" id="r2" />
                  <Label htmlFor="r2" className="flex-1">
                    <div className="bg-[#00CFFF]/10 p-3 rounded-md">
                      <h4 className="babix-info-header text-[#0A3A68]">35.000 Würfel</h4>
                      <p className="text-xl font-bold text-[#FF4C00]">35€</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="45000" id="r3" />
                  <Label htmlFor="r3" className="flex-1">
                    <div className="bg-[#00CFFF]/10 p-3 rounded-md">
                      <h4 className="babix-info-header text-[#0A3A68]">45.000 Würfel</h4>
                      <p className="text-xl font-bold text-[#FF4C00]">45€</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mt-6">
                <h4 className="babix-info-header text-[#0A3A68] mb-2 flex items-center">
                  <span className="material-icons text-yellow-500 mr-2">stars</span>
                  Sonderangebot
                </h4>
                <p className="text-sm mb-2">Während Lucky Chance oder Dice Roll aktiv:</p>
                <p className="text-sm mb-2">40.000 - 50.000 Würfel für <span className="text-xl font-bold text-[#FF4C00]">30€</span></p>
                <p className="text-xs text-gray-500">Nach Absprache möglich</p>
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
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="authtoken" onValueChange={handleAuthMethodChange}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="authtoken">Authtoken</TabsTrigger>
                  <TabsTrigger value="login">Facebook Zugangsdaten</TabsTrigger>
                </TabsList>
                
                <TabsContent value="authtoken">
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
                      
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        <div className="col-span-2">
                          <img src="/attached_assets/Authtoken_Anleitung_1_720_1561.webp" alt="Schritt 1" className="w-full h-auto rounded-md border border-gray-200" />
                          <p className="text-xs text-center mt-1">Schritt 1: Einstellungen öffnen</p>
                        </div>
                        <div className="col-span-2">
                          <img src="/attached_assets/Authtoken_Anleitung_2_720_1561.webp" alt="Schritt 2" className="w-full h-auto rounded-md border border-gray-200" />
                          <p className="text-xs text-center mt-1">Schritt 2: Auf Support tippen</p>
                        </div>
                        <div className="col-span-2">
                          <img src="/attached_assets/Authtoken_Anleitung_3_720_1561.webp" alt="Schritt 3" className="w-full h-auto rounded-md border border-gray-200" />
                          <p className="text-xs text-center mt-1">Schritt 3: Auf Hilfe tippen</p>
                        </div>
                        <div className="col-span-2">
                          <img src="/attached_assets/Authtoken_Anleitung_4_720_1561.webp" alt="Schritt 4" className="w-full h-auto rounded-md border border-gray-200" />
                          <p className="text-xs text-center mt-1">Schritt 4: Authtoken kopieren</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-6">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        name="agreedToTerms" 
                        className="h-4 w-4 text-[#00CFFF] rounded" 
                        checked={formData.agreedToTerms} 
                        onChange={handleInputChange} 
                        required 
                      />
                      <Label htmlFor="terms" className="text-sm">
                        Ich stimme den <Link href="/agb" className="text-[#00CFFF] hover:underline">AGB</Link> und <Link href="/datenschutz" className="text-[#00CFFF] hover:underline">Datenschutzbestimmungen</Link> zu
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full bg-[#FF4C00] hover:bg-[#FF4C00]/80">
                      Jetzt kaufen
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="login">
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="loginEmail">E-Mail-Adresse</Label>
                      <Input 
                        id="loginEmail" 
                        name="loginEmail" 
                        type="email" 
                        placeholder="ihre.email@beispiel.de" 
                        value={formData.loginEmail} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Passwort</Label>
                      <Input 
                        id="password" 
                        name="password" 
                        type="password" 
                        placeholder="Ihr Passwort" 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Handynummer</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        placeholder="+49 123 456789" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="recoveryCode1">Wiederherstellungscode 1</Label>
                        <Input 
                          id="recoveryCode1" 
                          name="recoveryCode1" 
                          placeholder="Code 1" 
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
                          placeholder="Code 2" 
                          value={formData.recoveryCode2} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <h4 className="babix-info-header text-[#0A3A68] mb-2 flex items-center">
                        <span className="material-icons text-yellow-500 mr-2">warning</span>
                        Wichtiger Hinweis
                      </h4>
                      <p className="text-sm">
                        Bitte stellen Sie sicher, dass alle Ihre Login-Daten korrekt sind. Wir benötigen diese Informationen, 
                        um sicher auf Ihren Account zugreifen zu können.
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-6">
                      <input 
                        type="checkbox" 
                        id="loginTerms" 
                        name="agreedToTerms" 
                        className="h-4 w-4 text-[#00CFFF] rounded" 
                        checked={formData.agreedToTerms} 
                        onChange={handleInputChange} 
                        required 
                      />
                      <Label htmlFor="loginTerms" className="text-sm">
                        Ich stimme den <Link href="/agb" className="text-[#00CFFF] hover:underline">AGB</Link> und <Link href="/datenschutz" className="text-[#00CFFF] hover:underline">Datenschutzbestimmungen</Link> zu
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full bg-[#FF4C00] hover:bg-[#FF4C00]/80">
                      Jetzt kaufen
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <div className="text-sm text-gray-500 mt-4">
                <p className="flex items-start">
                  <span className="material-icons text-[#00CFFF] mr-2 text-sm">security</span>
                  Ihre Daten werden sicher übermittelt und verschlüsselt gespeichert
                </p>
                <p className="flex items-start mt-2">
                  <span className="material-icons text-[#00CFFF] mr-2 text-sm">support_agent</span>
                  Bei Fragen kontaktieren Sie uns gerne über <Link href="/kontakt" className="text-[#00CFFF] hover:underline">unser Kontaktformular</Link>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}