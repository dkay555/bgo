import React, { useState, useRef } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle, 
  Check, 
  ChevronRight, 
  Copy, 
  Facebook, 
  Info, 
  Search, 
  Key,
  HelpCircle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import babixLogo from '@assets/babixGO (200 x 200 px)trans.png';

export default function AuthTokenToolPage() {
  const [inputValue, setInputValue] = useState('');
  const [extractedToken, setExtractedToken] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const extractToken = () => {
    setIsLoading(true);
    
    // Token-Extraktionslogik
    setTimeout(() => {
      try {
        const tokenRegex = /EAA[a-zA-Z0-9]{50,}/g;
        const matches = inputValue.match(tokenRegex);
        
        if (matches && matches.length > 0) {
          setExtractedToken(matches[0]);
          setIsValidToken(true);
          toast({
            title: "Token gefunden!",
            description: "Der Auth-Token wurde erfolgreich extrahiert.",
            variant: "success"
          });
        } else {
          setExtractedToken('');
          setIsValidToken(false);
          toast({
            title: "Kein Token gefunden",
            description: "In dem eingegebenen Text konnte kein gültiger Auth-Token gefunden werden.",
            variant: "destructive"
          });
        }
      } catch (error) {
        setExtractedToken('');
        setIsValidToken(false);
        toast({
          title: "Fehler bei der Verarbeitung",
          description: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 500);
  };

  const handleCopy = () => {
    if (extractedToken) {
      navigator.clipboard.writeText(extractedToken)
        .then(() => {
          setCopied(true);
          toast({
            title: "Kopiert!",
            description: "Der Auth-Token wurde in die Zwischenablage kopiert.",
            variant: "success"
          });
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          toast({
            title: "Fehler beim Kopieren",
            description: "Der Token konnte nicht kopiert werden. Bitte kopiere ihn manuell.",
            variant: "destructive"
          });
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-8">
      <div className="mb-4">
        <Link href="/">
          <a className="text-[#0A3A68] hover:text-[#00CFFF] flex items-center">
            <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
            Zurück zur Startseite
          </a>
        </Link>
      </div>

      <div className="flex items-center justify-center mb-6">
        <img src={babixLogo} alt="BabixGO Logo" className="h-12 w-12 mr-3" />
        <h1 className="text-3xl font-bold text-[#0A3A68]">Facebook Auth-Token Tool</h1>
      </div>
      <div className="w-48 h-1 bg-gradient-to-r from-[#00CFFF] to-[#0A3A68] mx-auto mb-8"></div>

      <div className="max-w-3xl mx-auto">
        <Card className="mb-6 border-[#00CFFF] shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Info className="h-6 w-6 text-[#00CFFF] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-[#0A3A68] mb-2">Was ist ein Auth-Token?</h2>
                <p className="mb-4">
                  Der Facebook Auth-Token ist ein sicherer Schlüssel, der es uns erlaubt, auf dein Monopoly GO!-Konto 
                  zuzugreifen, ohne dass du deine Anmeldedaten teilen musst. Dieser Token gewährt nur temporären Zugriff
                  und ist viel sicherer als das Teilen deines Passworts.
                </p>
                <div className="bg-blue-50 border-l-4 border-[#00CFFF] p-3 mb-4">
                  <p className="text-sm">
                    <span className="font-semibold">Wichtig:</span> Dein Auth-Token ist persönlich und sollte nur für
                    diese Bestellung verwendet werden. Er läuft nach einiger Zeit automatisch ab.
                  </p>
                </div>
                <Link href="/hilfe/authtoken">
                  <a className="text-[#00CFFF] hover:text-[#0A3A68] flex items-center">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Ausführliche Anleitung zum manuellen Extrahieren des Tokens
                  </a>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-[#0A3A68] shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-[#0A3A68] flex items-center mb-4">
              <Facebook className="h-5 w-5 mr-2 text-[#1877F2]" />
              Auth-Token extrahieren
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="tokenInput" className="block font-medium text-gray-700 mb-1">
                  Füge hier den Text aus deinem Facebook-Netzwerk ein:
                </label>
                <Textarea
                  id="tokenInput"
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Kopiere den Text aus dem Facebook-Netzwerk-Tab deines Browsers hier hinein..."
                  className="min-h-[100px]"
                />
              </div>
              
              <Button 
                onClick={extractToken} 
                disabled={!inputValue || isLoading} 
                className="w-full bg-[#1877F2] hover:bg-[#166FE5]"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Token wird extrahiert...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Auth-Token extrahieren
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {extractedToken && (
          <Card className={`mb-6 ${isValidToken ? 'border-green-500' : 'border-red-500'} shadow-md`}>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold flex items-center mb-4">
                <Key className={`h-5 w-5 mr-2 ${isValidToken ? 'text-green-500' : 'text-red-500'}`} />
                Extrahierter Auth-Token
              </h2>
              
              <div className="mb-4">
                <div className="relative">
                  <Textarea
                    value={extractedToken}
                    readOnly
                    className={`min-h-[60px] font-mono text-sm ${isValidToken ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute right-2 top-2"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              {isValidToken ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-3">
                  <div className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <p className="text-sm">
                      <span className="font-semibold">Gültiger Token gefunden!</span> Dieser Auth-Token kann nun 
                      für deine Bestellung verwendet werden. Du kannst ihn kopieren oder direkt im Bestellformular verwenden.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border-l-4 border-red-500 p-3">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                    <p className="text-sm">
                      <span className="font-semibold">Fehler:</span> Der extrahierte Token scheint ungültig zu sein. 
                      Bitte stelle sicher, dass du den korrekten Text aus dem Facebook-Netzwerk eingefügt hast.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="mb-6 border-gray-200 shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-[#0A3A68] flex items-center mb-4">
              <Info className="h-5 w-5 mr-2 text-[#00CFFF]" />
              Hilfe & Support
            </h2>
            
            <p className="mb-4">
              Falls du Probleme bei der Extraktion deines Auth-Tokens hast, kannst du die detaillierte Anleitung 
              mit Bildern auf unserer Hilfeseite ansehen oder uns direkt kontaktieren.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Link href="/hilfe/authtoken">
                <a className="inline-block px-4 py-2 bg-[#0A3A68] text-white font-medium rounded hover:bg-[#072a4e] transition-colors text-center">
                  Zur Anleitung
                </a>
              </Link>
              <Link href="/kontakt">
                <a className="inline-block px-4 py-2 bg-[#00CFFF] text-white font-medium rounded hover:bg-[#00b8e6] transition-colors text-center">
                  Support kontaktieren
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}