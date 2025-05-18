import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import SEOHead from '@/components/SEOHead';
import { PayPalButtonWrapper } from '@/components/PayPalButtonWrapper';
import { InfoIcon } from 'lucide-react';

// Form schema type
type LoginMethod = "authtoken" | "credentials";

// Form schema
const checkoutSchema = z.object({
  flagCount: z.string({
    required_error: "Bitte wähle eine Anzahl von Flaggen",
  }),
  name: z.string().min(2, {
    message: "Der Name muss mindestens 2 Zeichen lang sein",
  }),
  email: z.string().email({
    message: "Bitte gib eine gültige E-Mail-Adresse ein",
  }),
  whatsapp: z.string().optional(),
  loginMethod: z.enum(["authtoken", "credentials"] as const, {
    required_error: "Bitte wähle eine Login-Methode",
  }),
  ingameName: z.string().min(2, {
    message: "Bitte gib deinen In-Game Namen ein",
  }),
  friendCode: z.string().min(2, {
    message: "Bitte gib deinen Freundschaftslink oder -code ein",
  }),
  authToken: z.string().optional(),
  facebookEmail: z.string().optional(),
  facebookPassword: z.string().optional(),
  recoveryCode1: z.string().optional(),
  recoveryCode2: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Du musst die AGB akzeptieren",
  }),
  withdrawalAccepted: z.boolean().refine(val => val === true, {
    message: "Du musst auf dein Widerrufsrecht verzichten",
  }),
}).refine((data) => {
  if (data.loginMethod === "authtoken") {
    return !!data.authToken;
  }
  return true;
}, {
  message: "Bitte gib deinen Auth-Token ein",
  path: ["authToken"],
}).refine((data) => {
  if (data.loginMethod === "credentials") {
    return !!data.facebookEmail && !!data.facebookPassword && !!data.recoveryCode1 && !!data.recoveryCode2;
  }
  return true;
}, {
  message: "Bitte fülle alle Zugangsdaten aus",
  path: ["facebookEmail"],
});

type FormData = z.infer<typeof checkoutSchema>;

export default function FlaggenCheckout() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState('10');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('authtoken');

  // Versuche, gespeicherte Daten aus localStorage zu laden
  const getSavedFormData = (): Partial<FormData> => {
    try {
      const savedData = localStorage.getItem('flaggen_checkout_data');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Fehler beim Laden der gespeicherten Formulardaten:', error);
    }
    return {};
  };
  
  const savedData = getSavedFormData();

  const form = useForm<FormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      flagCount: savedData.flagCount || "10",
      name: savedData.name || user?.name || "",
      email: savedData.email || user?.email || "",
      whatsapp: savedData.whatsapp || "",
      loginMethod: savedData.loginMethod || "authtoken",
      ingameName: savedData.ingameName || "",
      friendCode: savedData.friendCode || "",
      authToken: savedData.authToken || "",
      facebookEmail: savedData.facebookEmail || "",
      facebookPassword: savedData.facebookPassword || "",
      recoveryCode1: savedData.recoveryCode1 || "",
      recoveryCode2: savedData.recoveryCode2 || "",
      termsAccepted: savedData.termsAccepted || false,
      withdrawalAccepted: savedData.withdrawalAccepted || false,
    },
    mode: "onChange",
  });
  
  // Setze loginMethod und selectedOption basierend auf den gespeicherten Daten
  useEffect(() => {
    if (savedData.loginMethod) {
      setLoginMethod(savedData.loginMethod as LoginMethod);
    }
    if (savedData.flagCount) {
      setSelectedOption(savedData.flagCount);
    }
  }, []);

  const handleFlagCountChange = (value: string) => {
    setSelectedOption(value);
    form.setValue("flagCount", value);
  };

  const handleLoginMethodChange = (value: LoginMethod) => {
    setLoginMethod(value);
    form.setValue("loginMethod", value);
  };

  // Berechne den Preis basierend auf der Anzahl der Flaggen
  const calculatePrice = (count: string): number => {
    if (count === '10') return 25;
    if (count === '20') return 45;
    return 25; // Standardpreis als Fallback
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    
    // Speichere die Daten im localStorage für persistenz zwischen Seitenneuladen
    localStorage.setItem('flaggen_checkout_data', JSON.stringify(data));
    
    toast({
      title: "Formular validiert",
      description: "Bitte schließe den Kauf über den PayPal-Button unten ab.",
    });
    
    // Scrolle zum PayPal-Button
    const paypalButton = document.getElementById('paypal-button-container');
    if (paypalButton) {
      paypalButton.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const flagOptions = [
    { value: "10", label: "10.000 Flaggen", price: 25 },
    { value: "20", label: "20.000 Flaggen", price: 45 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <SEOHead 
        pageName="Flaggen sammeln - Checkout" 
        customTitle="Flaggen sammeln - Checkout | babixGO" 
        customDescription="Flaggen für Monopoly GO Sammlungen kaufen - Checkout"
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="babix-info-header font-bold text-3xl md:text-4xl px--2 py-2 text-center mb-8">
          Checkout
        </h1>
        
        {/* Login Prompt */}
        {!user && (
          <div className="bg-blue-50 p-4 rounded-lg mb-8 flex flex-col sm:flex-row justify-between items-center">
            <div>
              <p className="text-[#0A3A68] font-semibold mb-2">Logge dich ein zum automatischen Ausfüllen deiner Daten:</p>
            </div>
            <div className="flex gap-4 mt-3 sm:mt-0">
              <Link href="/auth">
                <Button variant="default" className="bg-[#0A3A68]">
                  Login
                </Button>
              </Link>
              <Link href="/auth?register=true">
                <Button variant="outline" className="text-[#0A3A68] border-[#0A3A68]">
                  Registrieren
                </Button>
              </Link>
            </div>
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Flag Count Selection */}
            <Card>
              <CardContent className="py-4">
                <h2 className="text-xl font-bold text-[#0A3A68] mt-0 mb-2">Wie viele Flaggen möchtest du sammeln?</h2>
                
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="flagCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            value={selectedOption}
                            onValueChange={(val) => {
                              handleFlagCountChange(val);
                            }}
                            className="grid gap-2"
                          >
                            {flagOptions.map((option) => (
                              <div key={option.value} className="flex items-center space-x-3 w-full">
                                <RadioGroupItem value={option.value} id={`flag-${option.value}`} />
                                <Label htmlFor={`flag-${option.value}`} className="text-gray-900 flex items-center w-full cursor-pointer">
                                  <span>{option.label}</span>
                                  <span className="ml-2">🏳️</span>
                                  <span className="ml-auto font-semibold text-[#FF4C00]">{option.price}€</span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Personal Information */}
            <Card>
              <CardContent className="py-4">
                <h2 className="text-xl font-bold text-[#0A3A68] mt-0 mb-2">Persönliche Daten</h2>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Dein Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-Mail</FormLabel>
                        <FormControl>
                          <Input placeholder="deine@email.de" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>WhatsApp (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Deine WhatsApp Nummer für schnelle Kommunikation" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Monopoly Go Daten */}
            <Card>
              <CardContent className="py-4">
                <h2 className="text-xl font-bold text-[#0A3A68] mt-0 mb-2">Monopoly Go Daten</h2>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="ingameName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>In-Game Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Dein Name im Spiel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="friendCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Freundschaftslink oder -code</FormLabel>
                        <FormControl>
                          <Input placeholder="Dein Freundschaftslink oder -code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Login Method */}
            <Card>
              <CardContent className="py-4">
                <div className="flex flex-wrap items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-[#0A3A68] mt-0">Wie sollen wir uns einloggen?</h2>
                  <Link href="/hilfe/loginmoeglichkeiten">
                    <span className="text-[#00CFFF] text-sm hover:underline">
                      Du bist dir unsicher? Hier bekommst du mehr Infos dazu
                    </span>
                  </Link>
                </div>
                
                <div className="grid gap-6">
                  <div className="border-b border-gray-200 mb-4">
                    <div className="flex" role="tablist">
                      <div
                        role="tab"
                        aria-selected={loginMethod === 'authtoken'}
                        className={`
                          w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm cursor-pointer
                          ${loginMethod === 'authtoken' 
                            ? 'border-[#00CFFF] text-[#00CFFF]' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                        `}
                        onClick={() => handleLoginMethodChange('authtoken')}
                      >
                        Facebook Auth-Token
                      </div>
                      
                      <div
                        role="tab"
                        aria-selected={loginMethod === 'credentials'}
                        className={`
                          w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm cursor-pointer
                          ${loginMethod === 'credentials' 
                            ? 'border-[#00CFFF] text-[#00CFFF]' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                        `}
                        onClick={() => handleLoginMethodChange('credentials')}
                      >
                        Zugangsdaten
                      </div>
                    </div>
                  </div>
                  
                  {/* Auth Token Method */}
                  {loginMethod === 'authtoken' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          Wir benötigen deinen Facebook Auth-Token, um Flaggen in dein Spiel zu bringen. 
                          Keine Sorge, dies wird nur verwendet, um die Flaggen zu übertragen.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="authToken"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Facebook Auth-Token</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="EAABb..."
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-2">
                          <Link href="/tools/authtoken">
                            <span className="text-[#00CFFF] text-sm hover:underline">
                              Wie erhalte ich meinen Auth-Token? Hier klicken für eine Anleitung
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Credentials Method */}
                  {loginMethod === 'credentials' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          Wir benötigen deine Facebook-Zugangsdaten und die Wiederherstellungscodes, 
                          um Flaggen in dein Spiel zu bringen.
                        </p>
                      </div>
                      
                      <div className="space-y-4 border-t border-gray-100 pt-4">
                        <FormField
                          control={form.control}
                          name="facebookEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Facebook E-Mail/Telefon</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Deine Facebook E-Mail oder Telefonnummer"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="facebookPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Facebook Passwort</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password"
                                  placeholder="Dein Facebook Passwort"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="recoveryCode1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Wiederherstellungscode 1</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="z.B. ABCDEF123"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="recoveryCode2"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Wiederherstellungscode 2</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="z.B. 123ABCDEF"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="pt-2">
                          <Link href="/hilfe/wiederherstellungscodes">
                            <span className="text-[#00CFFF] text-sm hover:underline">
                              Wie erhalte ich meine Wiederherstellungscodes? Hier klicken für eine Anleitung
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Rechtliche Hinweise */}
            <Card>
              <CardContent className="py-4">
                <h2 className="text-xl font-bold text-[#0A3A68] mt-0 mb-2">Rechtliche Hinweise</h2>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Ich akzeptiere die <Link href="/agb"><span className="text-[#00CFFF] hover:underline">AGB</span></Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="withdrawalAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Ich stimme ausdrücklich zu, dass mit der Ausführung des Vertrags vor Ablauf der Widerrufsfrist begonnen wird und verzichte gemäß §356 Abs. 5 BGB auf mein <Link href="/widerruf"><span className="text-[#00CFFF] hover:underline">Widerrufsrecht</span></Link>.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <Button 
                type="submit" 
                className="bg-[#FF4C00] hover:bg-[#FF4C00]/90 px-12 py-6 text-lg"
              >
                Formular prüfen
              </Button>
            </div>
          </form>
        </Form>
        
        {/* PayPal Payment */}
        <div className="mt-12 mb-8" id="paypal-button-container">
          <h2 className="text-xl font-bold text-[#0A3A68] mb-4 text-center">Bezahlen mit PayPal</h2>
          <div className="max-w-md mx-auto">
            <PayPalButtonWrapper 
              amount={calculatePrice(selectedOption).toString()} 
              currency="EUR" 
              intent="capture"
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Nach der erfolgreichen Zahlung erhältst du eine Bestätigungsmail und wir werden uns bei dir melden.
          </p>
        </div>
      </div>
    </div>
  );
}