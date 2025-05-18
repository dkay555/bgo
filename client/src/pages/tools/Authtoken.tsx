import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import SEOHead from '@/components/SEOHead';

export default function AuthTokenTool() {
  const [redirectUrl, setRedirectUrl] = useState('');
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState<{ name?: string; id?: string; imageUrl?: string } | null>(null);
  const [error, setError] = useState('');

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

  return (
    <div className="container mx-auto px-4 py-8">
      <SEOHead 
        pageName="Facebook Auth-Token Tool" 
        customTitle="Monopoly GO Facebook Token Tool | babixGO" 
        customDescription="Extrahiere und validiere deinen Facebook Auth-Token für Monopoly GO"
      />
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-[#f0f8ff] shadow-lg">
          <CardContent className="py-6">
            <h2 className="text-2xl font-bold text-[#0A3A68] mb-4">Monopoly GO – Facebook Token Tool</h2>
            
            <a 
              href="https://www.facebook.com/v19.0/dialog/oauth?client_id=285025889266955&redirect_uri=https://m.facebook.com/connect/login_success.html&response_type=token&scope=public_profile" 
              target="_blank"
              className="inline-block bg-[#00CFFF] hover:bg-[#009FC4] text-white font-bold py-2 px-4 rounded-lg mb-4 text-center"
            >
              Mit Facebook (Monopoly GO) einloggen
            </a>

            <p className="text-[#0A3A68] mb-4">
              Nach dem Login wirst du auf eine Facebook-Seite mit einer langen URL weitergeleitet.<br />
              <strong>Kopiere diese URL und füge sie unten ein:</strong>
            </p>

            <Textarea
              id="redirectUrl"
              rows={4}
              placeholder="https://m.facebook.com....."
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
            
            <Button 
              onClick={extractToken}
              className="bg-[#00CFFF] hover:bg-[#009FC4] text-white font-bold"
            >
              Token extrahieren & Profil anzeigen
            </Button>

            {token && !error && (
              <div className="mt-4 p-3 bg-[#e0f7ff] rounded-lg break-words">
                <strong>Access Token:</strong><br />
                <code className="text-sm">{token}</code>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {profile && (
              <div className="mt-4 flex items-center gap-4 p-4 bg-[#e0f7ff] rounded-lg">
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
      </div>
    </div>
  );
}