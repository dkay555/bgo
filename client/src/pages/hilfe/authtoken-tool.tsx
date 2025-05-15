import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import SEOHead from '@/components/SEOHead';

export default function AuthTokenTool() {
  const [redirectUrl, setRedirectUrl] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<{ name: string; id: string; profilePic: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Funktion zum Speichern des Auth-Tokens im Benutzerprofil
  const handleSaveToken = async (authToken: string) => {
    if (!user) {
      toast({
        title: "Nicht eingeloggt",
        description: "Sie müssen eingeloggt sein, um den Token im Profil zu speichern.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const response = await fetch('/api/user/authtoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authToken }),
      });
      
      if (response.ok) {
        toast({
          title: "Token gespeichert!",
          description: "Der Token wurde erfolgreich in Ihrem Profil gespeichert.",
        });
      } else {
        throw new Error('Fehler beim Speichern des Tokens');
      }
    } catch (err) {
      toast({
        title: "Fehler beim Speichern",
        description: "Der Token konnte nicht gespeichert werden. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    }
  };

  // Funktion zum Extrahieren des Tokens aus der URL
  const extractToken = async () => {
    setIsLoading(true);
    setError(null);
    setToken(null);
    setUserData(null);

    const match = redirectUrl.match(/access_token=([^&"]+)/);

    if (!match) {
      setError('Kein Access Token gefunden. Bitte überprüfe die eingegebene URL.');
      setIsLoading(false);
      return;
    }

    const extractedToken = match[1];
    setToken(extractedToken);

    try {
      // Benutzerdaten abrufen
      const userResponse = await fetch(`https://graph.facebook.com/me?fields=id,name&access_token=${extractedToken}`);
      const userJson = await userResponse.json();

      // Profilbild abrufen
      const pictureResponse = await fetch(`https://graph.facebook.com/me/picture?type=large&redirect=false&access_token=${extractedToken}`);
      const pictureJson = await pictureResponse.json();

      if (userJson.name && pictureJson.data?.url) {
        setUserData({
          name: userJson.name,
          id: userJson.id,
          profilePic: pictureJson.data.url
        });
      } else {
        setError('Profil konnte nicht geladen werden.');
      }
    } catch (err) {
      setError('Fehler beim Laden der Profildaten. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <SEOHead 
        pageName="Facebook Auth Token Tool"
        customDescription="Extrahiere dein Facebook Auth Token für Monopoly GO mit unserem einfachen Tool."
        customKeywords="monopoly go, facebook auth token, token extractor, authtoken, facebook login"
      />

      <h1 className="font-['Baloo_2'] font-bold text-2xl md:text-3xl bg-[#00CFFF]/10 px-6 py-3 rounded-xl inline-block mb-8 border-b-2 border-[#00CFFF] text-[#FF4C00] babix-info-header">
        Monopoly GO – Facebook Token Tool
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Facebook Auth Token Generator</CardTitle>
          <CardDescription>
            Mit diesem Tool kannst du deinen Facebook Auth Token für Monopoly GO extrahieren
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <a 
                href="https://www.facebook.com/v19.0/dialog/oauth?client_id=285025889266955&redirect_uri=https://m.facebook.com/connect/login_success.html&response_type=token&scope=public_profile" 
                target="_blank"
                className="inline-flex h-10 px-6 py-2 bg-[#00CFFF] hover:bg-[#009fc4] text-white font-medium rounded-md items-center"
              >
                Mit Facebook (Monopoly GO) einloggen
              </a>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">
                Nach dem Login wirst du auf eine Facebook-Seite mit einer URL weitergeleitet.
                <strong> Kopiere diese komplette URL und füge sie unten ein:</strong>
              </p>
              <Textarea 
                value={redirectUrl}
                onChange={(e) => setRedirectUrl(e.target.value)}
                placeholder="https://m.facebook.com/connect/login_success.html#access_token=..."
                rows={4}
                className="w-full"
              />
            </div>

            <div>
              <Button 
                onClick={extractToken} 
                disabled={isLoading || !redirectUrl}
                className="bg-[#00CFFF] hover:bg-[#009fc4]"
              >
                {isLoading ? 'Wird verarbeitet...' : 'Token extrahieren & Profil anzeigen'}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {token && (
            <div className="mt-6 p-4 bg-[#e0f7ff] rounded-lg">
              <h3 className="font-semibold mb-2">Facebook Auth Token:</h3>
              <div className="p-3 bg-white rounded border overflow-x-auto">
                <code className="text-sm break-all">{token}</code>
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                <Button 
                  onClick={() => {
                    navigator.clipboard.writeText(token);
                    toast({
                      title: "Token kopiert!",
                      description: "Der Token wurde in die Zwischenablage kopiert.",
                    });
                  }} 
                  className="bg-[#0A3A68] hover:bg-[#08294d]"
                >
                  <span>Token kopieren</span>
                </Button>
                <Button 
                  onClick={() => handleSaveToken(token)}
                  className="bg-[#FF4C00] hover:bg-[#cc3b00]"
                >
                  Im Profil speichern
                </Button>
              </div>
              <p className="text-xs mt-3 text-gray-500">
                Wichtig: Bewahre diesen Token sicher auf, teile ihn nicht mit Dritten und verwende ihn nur für Monopoly GO.
              </p>
            </div>
          )}

          {userData && (
            <div className="mt-6 p-4 bg-[#e0f7ff] rounded-lg">
              <h3 className="font-semibold mb-2">Facebook Profil:</h3>
              <div className="flex items-center gap-4">
                <img 
                  src={userData.profilePic} 
                  alt="Profilbild" 
                  className="w-20 h-20 rounded-full border-2 border-[#00CFFF]" 
                />
                <div>
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p><strong>ID:</strong> {userData.id}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Anleitung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-[#0A3A68]">Wie du den Facebook Auth Token verwendest:</h3>
            <ol className="list-decimal list-inside space-y-2 mt-2">
              <li>Klicke auf den Button "Mit Facebook (Monopoly GO) einloggen"</li>
              <li>Logge dich mit deinen Facebook-Zugangsdaten ein (falls noch nicht geschehen)</li>
              <li>Kopiere die URL, zu der du weitergeleitet wirst</li>
              <li>Füge die URL in das Textfeld ein und klicke auf "Token extrahieren"</li>
              <li>Kopiere den generierten Token und verwende ihn in Monopoly GO</li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-semibold text-[#0A3A68]">Warum benötigst du einen Auth Token?</h3>
            <p className="mt-2">
              Der Facebook Auth Token ermöglicht es dir, dich bei Monopoly GO mit deinem Facebook-Konto 
              zu verbinden, ohne jedes Mal deine Login-Daten eingeben zu müssen. Dies ist besonders 
              nützlich, wenn du das Spiel auf mehreren Geräten spielst oder wenn du Probleme mit dem 
              Facebook-Login hast.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-[#0A3A68]">Sicherheitshinweise:</h3>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Teile deinen Token nicht mit anderen Personen</li>
              <li>Verwende den Token nur auf deinen eigenen Geräten</li>
              <li>Bei Sicherheitsbedenken generiere einen neuen Token</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}