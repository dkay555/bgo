import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Helmet } from 'react-helmet';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function DankePage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [leistung, setLeistung] = useState<string>('');
  const [fbMethode, setFbMethode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    ingameName: '',
    authtoken: '',
    sauthtoken: '',
    fbemail: '',
    fbpass: '',
    code1: '',
    code2: '',
    freundcode: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  useEffect(() => {
    document.title = 'Danke für deinen Kauf! | babixGO';
    
    // Daten aus dem Benutzerprofil übernehmen, wenn der Benutzer angemeldet ist
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        name: user.name || '',
        email: user.email || '',
        ingameName: user.ingameName || ''
      }));
    }
  }, [user]);

  // Form state management
  const updateFields = (value: string) => {
    setLeistung(value);
    setFbMethode(''); // Reset FB method when changing service type
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.ingameName || !leistung) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle Pflichtfelder aus.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Konsole-Debug: Daten im Request-Body
      console.log("Form submission data:", {
        ...formData,
        leistung,
        fbMethode
      });
      
      const response = await fetch('/api/order-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          leistung,
          fbMethode
        }),
      });
      
      console.log("Response status:", response.status);
      
      // Wir lesen die Response immer als Text zuerst, um zu sehen, was zurückkommt
      const responseText = await response.text();
      console.log("Response text:", responseText);
      
      // Dann versuchen wir, den Text als JSON zu parsen
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
        // Wenn wir kein gültiges JSON haben, aber dennoch Status 200, behandeln wir es als Erfolg
        if (response.ok) {
          setFormSubmitted(true);
          toast({
            title: "Erfolgreich gesendet",
            description: "Vielen Dank! Deine Daten wurden erfolgreich übermittelt.",
          });
          return;
        } else {
          throw new Error("Ungültiges JSON in der Antwort");
        }
      }
      
      // Verarbeiten der geparsten JSON-Daten
      if (data.success || response.ok) {
        setFormSubmitted(true);
        toast({
          title: "Erfolgreich gesendet",
          description: "Vielen Dank! Deine Daten wurden erfolgreich übermittelt.",
        });
      } else {
        toast({
          title: "Fehler",
          description: data.message || "Ein Fehler ist aufgetreten. Bitte versuche es später erneut.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Fehler",
        description: "Es gab ein Problem bei der Übermittlung. Bitte versuche es später erneut oder kontaktiere uns direkt per WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Danke für deinen Kauf! | babixGO</title>
        <meta name="description" content="Danke für deinen Kauf bei babixGO. Gib uns deine Daten um schnellstmöglich starten zu können." />
        <meta name="keywords" content="Monopoly Go, babixGO, Danke, Bestellung, Kauf" />
      </Helmet>

      <div className="w-full max-w-lg mx-auto">
        {/* Header section */}
        <div className="bg-[#00CFFF] rounded-t-2xl shadow-lg flex items-center justify-center py-5 mb-0 relative">
          <svg className="w-8 h-8 mr-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="3" stroke="white" strokeWidth="2" fill="#00CFFF"/>
            <circle cx="9" cy="9" r="1" fill="white"/>
            <circle cx="15" cy="9" r="1" fill="white"/>
            <circle cx="9" cy="15" r="1" fill="white"/>
            <circle cx="15" cy="15" r="1" fill="white"/>
          </svg>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Danke für deinen Kauf!
          </h1>
        </div>

        {/* Main content */}
        <div className="max-w-lg w-full bg-white rounded-b-2xl shadow-lg p-6">
          {/* Login Box or Welcome Message */}
          {user ? (
            <Card className="mb-6 border-[#00CFFF] border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Hallo {user.name || user.username}!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Du bist eingeloggt und deine Daten wurden automatisch übernommen.</p>
                <div className="mt-2 text-sm">
                  <span className="font-semibold">Name:</span> {user.name || '-'}<br />
                  <span className="font-semibold">E-Mail:</span> {user.email || '-'}<br />
                  <span className="font-semibold">Ingame Name:</span> {user.ingameName || '-'}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Link href="/profile" className="text-[#00CFFF] hover:underline text-sm">
                  Zum Profil →
                </Link>
              </CardFooter>
            </Card>
          ) : (
            <Card className="mb-6 border-gray-300 border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Schneller einkaufen mit Konto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">Melde dich an oder erstelle ein Konto, um deine Daten automatisch einzutragen und deine Bestellungen zu verwalten.</p>
                <div className="flex gap-3">
                  <Link href="/auth" className="bg-[#00CFFF] hover:bg-[#00A0CC] text-white font-bold py-2 px-4 rounded-lg transition text-sm">
                    Anmelden
                  </Link>
                  <Link href="/auth?tab=register" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition text-sm">
                    Registrieren
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Introduction with buttons */}
          <div className="bg-[#F5F5F5] rounded-xl p-4 mb-6 text-center">
            <p className="mb-3">
              Um schnellstmöglich starten zu können, benötigen wir noch einige Daten von dir.<br />
              Schreib uns direkt per WhatsApp, eröffne ein Ticket<br />
              <span className="text-gray-700">oder nutze das folgende Formular:</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-2">
              <a href="https://wa.me/4915237250453"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-2 px-6 rounded-lg transition shadow">
                WhatsApp
              </a>
              <Link href="/tickets/new"
                className="bg-[#FF4C00] hover:bg-[#cc3b00] text-white font-bold py-2 px-6 rounded-lg transition shadow">
                Ticket eröffnen
              </Link>
            </div>
          </div>

          {formSubmitted ? (
            <div className="text-center bg-green-50 p-6 rounded-lg border-2 border-green-100">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-2 text-[#0A3A68]">Vielen Dank!</h3>
              <p className="mb-4">
                Deine Daten wurden erfolgreich übermittelt. Wir werden uns so schnell wie möglich um deine Bestellung kümmern.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/"
                  className="bg-[#00CFFF] hover:bg-[#00A0CC] text-white font-bold py-2 px-6 rounded-lg transition shadow">
                  Zurück zur Startseite
                </Link>
                <a href="https://wa.me/4915237250453"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-2 px-6 rounded-lg transition shadow">
                  WhatsApp Support
                </a>
              </div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Personal data */}
              <div>
                <label className="block font-bold mb-1" htmlFor="name">Name</label>
                <Input 
                  id="name" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block font-bold mb-1" htmlFor="email">E-Mail</label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block font-bold mb-1" htmlFor="whatsapp">WhatsApp (optional)</label>
                <Input 
                  id="whatsapp" 
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block font-bold mb-1" htmlFor="ingameName">Ingame Name</label>
                <Input 
                  id="ingameName" 
                  name="ingameName" 
                  required
                  value={formData.ingameName}
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Service selection */}
              <div>
                <label className="block font-bold mb-1" htmlFor="leistung">Welche Leistung hast du gebucht?</label>
                <Select value={leistung} onValueChange={updateFields}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bitte wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boost">Würfelboost / Flaggen / Eventwährung</SelectItem>
                    <SelectItem value="schnupper">Schnupperboost</SelectItem>
                    <SelectItem value="partner">Partner-/Teamplatz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Dynamic fields: Boost/Flaggen/Eventwährung */}
              {leistung === 'boost' && (
                <div>
                  <div className="font-bold mb-1">FB Loginmethode</div>
                  <div className="flex items-center mb-2">
                    <input 
                      id="fbtoken" 
                      name="fbmethode" 
                      type="radio" 
                      value="authtoken" 
                      checked={fbMethode === 'authtoken'}
                      onChange={() => setFbMethode('authtoken')}
                      className="mr-2" 
                    />
                    <label htmlFor="fbtoken" className="mr-4">FB Authtoken</label>
                    <input 
                      id="fblogin" 
                      name="fbmethode" 
                      type="radio" 
                      value="logindaten" 
                      checked={fbMethode === 'logindaten'}
                      onChange={() => setFbMethode('logindaten')}
                      className="mr-2" 
                    />
                    <label htmlFor="fblogin">FB Logindaten</label>
                  </div>
                  {/* Authtoken field with hint */}
                  {fbMethode === 'authtoken' && (
                    <div>
                      <label className="block font-bold mb-1" htmlFor="authtoken">FB Authtoken</label>
                      <Input 
                        id="authtoken" 
                        name="authtoken"
                        value={formData.authtoken}
                        onChange={handleInputChange}
                      />
                      <div className="text-xs mt-2 text-[#0A3A68]">
                        Brauchst du Hilfe mit dem Token? –
                        <Link href="/hilfe/authtoken" className="text-[#00CFFF] underline font-bold ml-1">
                          Hier findest du unser Tool
                        </Link>
                      </div>
                    </div>
                  )}
                  {/* Login data */}
                  {fbMethode === 'logindaten' && (
                    <div>
                      <label className="block font-bold mb-1" htmlFor="fbemail">E-Mail oder Handynummer</label>
                      <Input 
                        id="fbemail" 
                        name="fbemail" 
                        className="mb-2"
                        value={formData.fbemail}
                        onChange={handleInputChange}
                      />
                      <label className="block font-bold mb-1" htmlFor="fbpass">Passwort</label>
                      <Input 
                        id="fbpass" 
                        name="fbpass" 
                        type="password" 
                        className="mb-2"
                        value={formData.fbpass}
                        onChange={handleInputChange}
                      />
                      <label className="block font-bold mb-1" htmlFor="code1">Wiederherstellungscode 1</label>
                      <Input 
                        id="code1" 
                        name="code1" 
                        className="mb-2"
                        value={formData.code1}
                        onChange={handleInputChange}
                      />
                      <label className="block font-bold mb-1" htmlFor="code2">Wiederherstellungscode 2</label>
                      <Input 
                        id="code2" 
                        name="code2"
                        value={formData.code2}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>
              )}
              
              {/* Schnupperboost: only Authtoken */}
              {leistung === 'schnupper' && (
                <div>
                  <label className="block font-bold mb-1" htmlFor="sauthtoken">FB Authtoken</label>
                  <Input 
                    id="sauthtoken" 
                    name="sauthtoken"
                    value={formData.sauthtoken}
                    onChange={handleInputChange}
                  />
                  <div className="text-xs mt-2 text-[#0A3A68]">
                    Brauchst du Hilfe mit dem Token? –
                    <Link href="/hilfe/authtoken" className="text-[#00CFFF] underline font-bold ml-1">
                      Hier findest du unser Tool
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Partner Teamplatz: Friendship link / code */}
              {leistung === 'partner' && (
                <div>
                  <label className="block font-bold mb-1" htmlFor="freundcode">Freundschaftslink oder -code</label>
                  <Input 
                    id="freundcode" 
                    name="freundcode"
                    value={formData.freundcode}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              
              <Button 
                className="w-full bg-[#FF4C00] hover:bg-[#cc3b00] text-white font-bold py-2 rounded"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Wird gesendet...' : 'Daten absenden'}
              </Button>
            </form>
          )}

          {/* Help block */}
          <div className="mt-6 bg-[#F5F5F5] p-4 rounded-xl text-sm text-center">
            <p className="mb-2">
              Wie es nun weitergeht, kannst du im entsprechenden Hilfsartikel nochmals nachlesen:<br />
              <Link href="/hilfe/wuerfel" className="text-[#00CFFF] underline font-bold">Hilfe Würfel</Link> {' | '}
              <Link href="/hilfe/partner" className="text-[#00CFFF] underline font-bold">Partnerevent</Link> {' | '}
              <Link href="/hilfe/race" className="text-[#00CFFF] underline font-bold">Tycoon Racers</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}