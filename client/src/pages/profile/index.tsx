import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Save, Copy, Check } from 'lucide-react';

export default function ProfilePage() {
  const { toast } = useToast();
  const { user, updateProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ingameName: '',
    phoneNumber: '',
    fbPassword: '',
    authToken: '',
    friendLink: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showAuthToken, setShowAuthToken] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Lade gespeicherte Daten aus dem localStorage
    const savedProfile = localStorage.getItem('userGameProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setFormData(prev => ({
          ...prev,
          ...parsedProfile
        }));
      } catch (e) {
        console.error('Fehler beim Laden des Profils:', e);
      }
    }
    
    // Wenn Benutzer authentifiziert ist, lade Name und Email
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveProfile = async () => {
    setSaving(true);
    
    try {
      // Speichere im localStorage
      localStorage.setItem('userGameProfile', JSON.stringify(formData));
      
      // Wenn der Benutzer eingeloggt ist, aktualisiere auch die Profildaten im Backend
      if (user) {
        await updateProfile({
          name: formData.name,
          email: formData.email
        });
      }
      
      toast({
        title: "Profil gespeichert",
        description: "Deine Profildaten wurden erfolgreich gespeichert.",
        variant: "success"
      });
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      toast({
        title: "Fehler beim Speichern",
        description: "Deine Daten konnten nicht gespeichert werden. Bitte versuche es später erneut.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const copyAuthToken = () => {
    navigator.clipboard.writeText(formData.authToken);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    
    toast({
      title: "Kopiert!",
      description: "Der Auth-Token wurde in die Zwischenablage kopiert.",
      variant: "success"
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="babix-info-header font-bold text-2xl md:text-3xl text-center mb-8">
        Mein Profil
      </h1>
      
      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="game">Spielerdaten</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="game" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Meine Monopoly GO Daten</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="babix-info-box">
                  <h3 className="babix-box-title">💡 Datenschutz-Hinweis</h3>
                  <p className="text-gray-700">Deine Spieldaten werden nur lokal in deinem Browser gespeichert und nie an unsere Server übertragen. Du kannst sie jederzeit hier ändern oder löschen.</p>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="ingameName">Ingame-Name</Label>
                    <Input 
                      id="ingameName"
                      name="ingameName"
                      placeholder="Dein Name im Spiel"
                      value={formData.ingameName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="friendLink">Freundschaftslink</Label>
                    <Input 
                      id="friendLink"
                      name="friendLink"
                      placeholder="Dein Freundschaftslink aus Monopoly GO"
                      value={formData.friendLink}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-Mail / Handynummer für Login</Label>
                    <Input 
                      id="email"
                      name="email"
                      placeholder="Deine E-Mail oder Handynummer für den Login"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Alternative Kontaktnummer</Label>
                    <Input 
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Deine alternative Handynummer"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="fbPassword">Facebook-Passwort (optional)</Label>
                    <div className="relative">
                      <Input 
                        id="fbPassword"
                        name="fbPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Dein Facebook-Passwort"
                        value={formData.fbPassword}
                        onChange={handleInputChange}
                      />
                      <button 
                        type="button"
                        className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">Speichert dein Passwort sicher in deinem Browser.</p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="authToken">Facebook Auth-Token</Label>
                    <div className="relative">
                      <div className="flex">
                        <Input 
                          id="authToken"
                          name="authToken"
                          type={showAuthToken ? "text" : "password"}
                          placeholder="Dein Auth-Token (von unserem Tool)"
                          value={formData.authToken}
                          onChange={handleInputChange}
                          className="pr-20"
                        />
                        <button 
                          type="button"
                          className="absolute right-20 top-2.5 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowAuthToken(!showAuthToken)}
                        >
                          {showAuthToken ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <Button 
                          type="button"
                          variant="outline"
                          size="icon"
                          className="absolute right-2 top-1"
                          onClick={copyAuthToken}
                        >
                          {copied ? <Check size={18} /> : <Copy size={18} />}
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Token nicht vorhanden? <a href="/tools/authtoken" className="text-[#00CFFF] hover:text-[#FF4C00]">Hier generieren</a>
                    </p>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-[#00CFFF] hover:bg-[#009FC4]" 
                  onClick={saveProfile}
                  disabled={saving}
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Speichern...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save size={18} />
                      Daten speichern
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Meine Kontodaten</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="Dein Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="accountEmail">E-Mail Adresse</Label>
                    <Input 
                      id="accountEmail"
                      name="email"
                      placeholder="Deine E-Mail Adresse"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-[#00CFFF] hover:bg-[#009FC4]" 
                  onClick={saveProfile}
                  disabled={saving}
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Speichern...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save size={18} />
                      Daten speichern
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}