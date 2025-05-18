import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import SEOHead from '@/components/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

export default function AuthTokenTool() {
  const [redirectUrl, setRedirectUrl] = useState('');
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState<{ name?: string; id?: string; imageUrl?: string } | null>(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const extractToken = async () => {
    const match = redirectUrl.match(/access_token=([^&"]+)/);
    setError('');
    setToken('');
    setProfile(null);

    if (!match) {
      setError("Kein Access Token gefunden.");
      return;
    }

    const extractedToken = match[1];
    setToken(extractedToken);

    try {
      const res1 = await fetch(`https://graph.facebook.com/me?fields=id,name&access_token=${extractedToken}`);
      const userData = await res1.json();

      if (userData.error) {
        setError(`Fehler: ${userData.error.message}`);
        return;
      }

      const res2 = await fetch(`https://graph.facebook.com/me/picture?type=large&redirect=false&access_token=${extractedToken}`);
      const picData = await res2.json();

      if (userData.name && picData.data?.url) {
        setProfile({
          name: userData.name,
          id: userData.id,
          imageUrl: picData.data.url
        });
      } else {
        setError("Profil konnte nicht geladen werden.");
      }
    } catch (err) {
      setError("Fehler beim Laden der Profildaten.");
    }
  };

  const copyTokenToClipboard = () => {
    if (token) {
      navigator.clipboard.writeText(token).then(
        () => {
          toast({
            title: "Erfolg!",
            description: "Der Token wurde in die Zwischenablage kopiert.",
          });
        },
        (err) => {
          toast({
            title: "Fehler",
            description: "Der Token konnte nicht kopiert werden: " + err,
            variant: "destructive",
          });
        }
      );
    }
  };

  const saveTokenToAccount = () => {
    // Diese Funktion würde den Token im Kundenkonto speichern
    toast({
      title: "Hinweis",
      description: "Diese Funktion ist noch in Entwicklung und wird bald verfügbar sein.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SEOHead 
        pageName="Facebook Auth-Token Tool" 
        customTitle="Monopoly GO Facebook Token Tool | babixGO" 
        customDescription="Extrahiere und validiere deinen Facebook Auth-Token für Monopoly GO"
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="babix-info-header font-bold text-3xl md:text-4xl text-center mb-8">
          FB Authtoken Tool
        </h1>
        
        <div className="mb-8">
          <p className="text-lg mb-4">Mit diesem Helfer kannst du ganz einfach an deinen Authtoken gelangen. Weiter unten findest du eine Anleitung inkl. Video.</p>
          
          <p className="mb-6"><strong>Bitte beachten:</strong> Der Token ist bis zu 60 Tage gültig und gewährt nur Zugriff auf deinen Monopoly Go Account. Du kannst ihn durch eine Änderung deines Passworts ungültig machen.</p>
        </div>
        
        <h2 className="text-2xl font-bold text-[#0A3A68] mb-4 text-center">Token Tool</h2>
        
        <Card className="bg-[#f0f8ff] shadow-lg mb-6">
          <CardContent className="py-6">
            <div className="flex justify-center mb-6">
              <a 
                href="https://www.facebook.com/v19.0/dialog/oauth?client_id=285025889266955&redirect_uri=https://m.facebook.com/connect/login_success.html&response_type=token&scope=public_profile" 
                target="_blank"
                className="inline-block bg-[#00CFFF] hover:bg-[#009FC4] text-white font-bold py-3 px-6 rounded-lg text-center"
              >
                Mit Facebook (Monopoly GO) anmelden
              </a>
            </div>

            <p className="text-[#0A3A68] mb-4 text-center font-semibold">
              Nach dem Login wirst du auf eine Facebook-Seite mit einer langen URL weitergeleitet.<br />
              Kopiere diese URL und füge sie unten ein:
            </p>

            <Textarea
              id="redirectUrl"
              rows={4}
              placeholder="https://m.facebook.com....."
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
            
            <div className="flex justify-center">
              <Button 
                onClick={extractToken}
                className="bg-[#00CFFF] hover:bg-[#009FC4] text-white font-bold py-3 px-6"
                size="lg"
              >
                Token extrahieren
              </Button>
            </div>

            {token && !error && (
              <div className="mt-6 p-4 bg-[#e0f7ff] rounded-lg break-words">
                <strong className="block mb-1 text-lg">Access Token:</strong>
                <code className="text-sm block p-2 bg-white rounded border border-gray-200 mb-4">{token}</code>
                
                <div className="flex justify-center gap-4 mt-2">
                  <Button 
                    onClick={copyTokenToClipboard}
                    variant="outline" 
                    className="border-[#00CFFF] text-[#00CFFF] hover:bg-[#00CFFF] hover:text-white"
                  >
                    Token kopieren
                  </Button>
                  <Button 
                    onClick={saveTokenToAccount}
                    variant="outline"
                    className="border-[#FF4C00] text-[#FF4C00] hover:bg-[#FF4C00] hover:text-white"
                  >
                    Token speichern
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {profile && (
              <div className="mt-6 flex items-center gap-4 p-4 bg-[#e0f7ff] rounded-lg">
                {profile.imageUrl && (
                  <img 
                    src={profile.imageUrl} 
                    alt="Facebook Profilbild" 
                    className="w-20 h-20 rounded-full"
                  />
                )}
                <div>
                  <p><strong>Name:</strong><br />{profile.name}</p>
                  <p><strong>ID:</strong><br />{profile.id}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#0A3A68] mb-6 text-center">Anleitung</h2>
          
          <div className="mb-8 border border-gray-200 rounded-lg p-4 flex justify-center">
            <video 
              className="w-full max-w-2xl" 
              controls
              autoPlay={false}
              preload="metadata"
              poster="/images/auth-token/step1.webp"
            >
              <source src="/videos/anleitung_tokentool.mp4" type="video/mp4" />
              Dein Browser unterstützt keine Videos. Bitte sieh dir die Anleitung weiter unten an.
            </video>
          </div>
          
          <h3 className="text-xl font-bold text-[#0A3A68] mb-3">Schriftliche Anleitung</h3>
          <ol className="list-decimal pl-5 space-y-2 mb-8">
            <li>Klicke auf den Button "Mit Facebook (Monopoly GO) anmelden"</li>
            <li>Melde dich bei Facebook an oder wenn du schon angemeldet bist klicke auf fortfahren</li>
            <li><strong>Nun musst du schnell sein:</strong> Klicke direkt auf die Adressleiste deines Browser und kopiere den Link. Aus Sicherheitsgründen ändert er sich nach kurzer Zeit.</li>
            <li>Kehre zum Tool zurück und füge den Link ein</li>
            <li>Wähle "Token extrahieren"</li>
            <li>Wenn alles funktioniert hat, sollte der Token & dein Facebook Profil angezeigt werden</li>
            <li>Du kannst diesen nun kopieren oder in deinem Konto speichern</li>
          </ol>
          
          <div className="bg-blue-50 p-5 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-[#0A3A68] mb-2">Du hast Fragen?</h3>
            <p className="mb-3">Schicke uns gerne eine Nachricht!</p>
            <Link href="/kontakt">
              <Button className="bg-[#00CFFF] hover:bg-[#009FC4] text-white">
                Kontakt aufnehmen
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}