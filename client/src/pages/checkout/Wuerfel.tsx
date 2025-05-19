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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import SEOHead from '@/components/SEOHead';
import { InfoIcon } from 'lucide-react';

// Form schema type
type BoostTime = "asap" | "tournament";
type LoginMethod = "authtoken" | "credentials";

// Form schema
const checkoutSchema = z.object({
  product: z.string({
    required_error: "Bitte wähle eine Würfelmenge",
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
  authToken: z.string().optional(),
  facebookEmail: z.string().optional(),
  facebookPassword: z.string().optional(),
  recoveryCode1: z.string().optional(),
  recoveryCode2: z.string().optional(),
  boostTime: z.enum(["asap", "tournament"] as const, {
    required_error: "Bitte wähle, wann der Boost erfolgen soll",
  }),
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
  if (data.loginMethod === "credentials" && !data.product.includes('schnupper')) {
    return !!data.facebookEmail && !!data.facebookPassword && !!data.recoveryCode1 && !!data.recoveryCode2;
  }
  return true;
}, {
  message: "Bitte fülle alle Zugangsdaten aus",
  path: ["facebookEmail"],
});

type FormData = z.infer<typeof checkoutSchema>;

export default function WuerfelCheckout() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState('25000');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('authtoken');

  // Versuche, gespeicherte Daten aus localStorage zu laden
  const getSavedFormData = (): Partial<FormData> => {
    try {
      const savedData = localStorage.getItem('wuerfel_checkout_data');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Fehler beim Laden der gespeicherten Formulardaten:', error);
    }
    return {};
  };
  
  // Lade Spielerdaten aus dem Profil
  const getProfileGameData = (): Partial<FormData> => {
    try {
      const profileData = localStorage.getItem('userGameProfile');
      if (profileData) {
        const parsedData = JSON.parse(profileData);
        return {
          ingameName: parsedData.ingameName || '',
          authToken: parsedData.authToken || '',
          facebookEmail: parsedData.phoneNumber || '', // E-Mail/Handynummer für Login
          facebookPassword: parsedData.fbPassword || '',
        };
      }
    } catch (error) {
      console.error('Fehler beim Laden der Profildaten:', error);
    }
    return {};
  };
  
  // Kombiniere gespeicherte Checkout-Daten mit Profildaten, wobei Checkout-Daten Vorrang haben
  const savedData = getSavedFormData();
  const profileData = getProfileGameData();

  const form = useForm<FormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      product: savedData.product || "25000",
      name: savedData.name || user?.name || "",
      email: savedData.email || user?.email || "",
      whatsapp: savedData.whatsapp || "",
      loginMethod: savedData.loginMethod || "authtoken",
      // Priorität: 1. Gespeicherte Checkout-Daten, 2. Profildaten, 3. Leer
      ingameName: savedData.ingameName || profileData.ingameName || "",
      authToken: savedData.authToken || profileData.authToken || "",
      facebookEmail: savedData.facebookEmail || profileData.facebookEmail || "",
      facebookPassword: savedData.facebookPassword || profileData.facebookPassword || "",
      recoveryCode1: savedData.recoveryCode1 || "",
      recoveryCode2: savedData.recoveryCode2 || "",
      boostTime: savedData.boostTime || "asap",
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
    if (savedData.product) {
      setSelectedOption(savedData.product);
    }
  }, []);

  const handleLoginMethodChange = (value: LoginMethod) => {
    // Bei Schnupperboost nur Auth-Token erlauben
    if (selectedOption.includes('schnupper') && value !== 'authtoken') {
      return; // Nicht wechseln, wenn Schnupperboost aktiv ist
    }
    
    setLoginMethod(value);
    form.setValue("loginMethod", value);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Speichere die Daten im localStorage für persistenz zwischen Seitenneuladen
    localStorage.setItem('wuerfel_checkout_data', JSON.stringify(data));
    
    // Speichere die Bestelldaten für die Erfolgsseite
    localStorage.setItem('latest_order_data', JSON.stringify({
      productName: selectedOption === '25000' ? '25.000 Würfel' : 
                  selectedOption === '35000' ? '35.000 Würfel' : 
                  selectedOption === '45000' ? '45.000 Würfel' : 
                  selectedOption === 'schnupper' ? 'Schnupperboost 10.000 Würfel' : 'Schnupperboost inkl. Events',
      amount: selectedOption === '25000' ? '25.00' : 
              selectedOption === '35000' ? '35.00' : 
              selectedOption === '45000' ? '45.00' : 
              selectedOption === 'schnupper' ? '10.00' : '15.00',
      gameUsername: data.ingameName,
      boostTime: data.boostTime,
      paymentMethod: 'Vorkasse/Überweisung'
    }));
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod: 'bank_transfer',
          paymentStatus: 'pending',
          customerName: data.name,
          customerEmail: data.email,
          whatsappNumber: data.whatsapp || '',
          gameUsername: data.ingameName,
          productType: 'wuerfel',
          productName: selectedOption === '25000' ? '25.000 Würfel' : 
                      selectedOption === '35000' ? '35.000 Würfel' : 
                      selectedOption === '45000' ? '45.000 Würfel' : 
                      selectedOption === 'schnupper' ? 'Schnupperboost 10.000 Würfel' : 'Schnupperboost inkl. Events',
          productDetails: JSON.stringify({
            diceAmount: selectedOption,
            loginMethod: data.loginMethod,
            boostTime: data.boostTime,
            authToken: data.authToken || '',
            fbEmail: data.facebookEmail || '',
            fbPassword: data.facebookPassword || '',
            recoveryCode1: data.recoveryCode1 || '',
            recoveryCode2: data.recoveryCode2 || ''
          }),
          amount: selectedOption === '25000' ? '25.00' : 
                  selectedOption === '35000' ? '35.00' : 
                  selectedOption === '45000' ? '45.00' : 
                  selectedOption === 'schnupper' ? '10.00' : '15.00'
        }),
      });
      
      if (response.ok) {
        toast({
          title: "Bestellung erfolgreich aufgegeben",
          description: "Wir haben deine Bestellung erhalten und senden dir alle Details per E-Mail.",
        });
        
        // Verzögerung vor Weiterleitung
        setTimeout(() => {
          window.location.href = '/checkout/Erfolg';
        }, 1500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fehler beim Erstellen der Bestellung");
      }
    } catch (error) {
      console.error('Fehler beim Senden der Bestelldaten:', error);
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Speichern deiner Bestellung. Bitte kontaktiere uns über das Kontaktformular.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SEOHead 
        pageName="Würfel kaufen - Checkout" 
        customTitle="Würfel kaufen - Checkout | babixGO" 
        customDescription="Würfelpakete für Monopoly GO kaufen - Checkout"
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="babix-info-header font-bold text-3xl md:text-4xl px--2 py-2 text-center mb-8">
          Checkout
        </h1>
        
        {/* Login/Profil Prompt */}
        {!user ? (
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
        ) : (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6 flex items-start gap-3">
            <InfoIcon className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="text-green-800 font-semibold">Spielerdaten aus deinem Profil geladen</p>
              <p className="text-green-700 text-sm mt-1">
                Die Formularfelder wurden automatisch mit deinen gespeicherten Spielerdaten ausgefüllt. 
                Du kannst sie bei Bedarf für diese Bestellung anpassen.
              </p>
              <p className="text-green-700 text-sm mt-1">
                <Link href="/profile" className="text-green-700 underline hover:text-green-800">
                  Zum Profil
                </Link> um deine gespeicherten Daten zu bearbeiten.
              </p>
            </div>
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Product Selection */}
            <Card>
              <CardContent className="py-4">
                <h2 className="text-xl font-bold text-[#0A3A68] mt-0 mb-2">Bitte wähle deine gewünschte Menge:</h2>
                
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            value={selectedOption}
                            onValueChange={(val) => {
                              setSelectedOption(val);
                              field.onChange(val);
                              
                              // Bei Schnupperboost nur Auth-Token als Login-Methode erlauben
                              if (val === 'schnupper' || val === 'schnupperEvent') {
                                setLoginMethod('authtoken');
                                form.setValue("loginMethod", "authtoken");
                              }
                            }}
                            className="grid gap-2"
                          >
                            <div className="flex items-center space-x-3 w-full">
                              <RadioGroupItem value="25000" id="25000" />
                              <Label htmlFor="25000" className="text-gray-900 flex items-center w-full cursor-pointer">
                                <span>25.000 Würfel</span>
                                <span className="ml-2">🎲</span>
                                <span className="ml-auto font-semibold text-[#FF4C00]">25€</span>
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-3 w-full">
                              <RadioGroupItem value="35000" id="35000" />
                              <Label htmlFor="35000" className="text-gray-900 flex items-center w-full cursor-pointer">
                                <span>35.000 Würfel</span>
                                <span className="ml-2">🎲</span>
                                <span className="ml-auto font-semibold text-[#FF4C00]">35€</span>
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-3 w-full">
                              <RadioGroupItem value="45000" id="45000" />
                              <Label htmlFor="45000" className="text-gray-900 flex items-center w-full cursor-pointer">
                                <span>45.000 Würfel</span>
                                <span className="ml-2">🎲</span>
                                <span className="ml-auto font-semibold text-[#FF4C00]">45€</span>
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-3 w-full">
                              <RadioGroupItem value="schnupper" id="schnupper" />
                              <Label htmlFor="schnupper" className="text-gray-900 flex items-center w-full cursor-pointer">
                                <span>Schnupperboost 10.000 Würfel</span>
                                <span className="ml-auto font-semibold text-[#FF4C00]">10€</span>
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-3 w-full">
                              <RadioGroupItem value="schnupperEvent" id="schnupperEvent" />
                              <Label htmlFor="schnupperEvent" className="text-gray-900 flex items-center w-full cursor-pointer">
                                <span>Schnupperboost inkl. Events</span>
                                <span className="ml-auto font-semibold text-[#FF4C00]">15€</span>
                              </Label>
                            </div>
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
            
            {/* Login Method */}
            <Card>
              <CardContent className="py-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h2 className="text-xl font-bold text-[#0A3A68] mt-0">Login-Methode</h2>
                  
                  {!selectedOption.includes('schnupper') && (
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant={loginMethod === 'authtoken' ? "default" : "outline"}
                        onClick={() => handleLoginMethodChange('authtoken')}
                        className={loginMethod === 'authtoken' ? "bg-[#0A3A68]" : "text-[#0A3A68] border-[#0A3A68]"}
                      >
                        Auth-Token
                      </Button>
                      <Button
                        type="button"
                        variant={loginMethod === 'credentials' ? "default" : "outline"}
                        onClick={() => handleLoginMethodChange('credentials')}
                        className={loginMethod === 'credentials' ? "bg-[#0A3A68]" : "text-[#0A3A68] border-[#0A3A68]"}
                      >
                        Facebook-Login
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Auth Token Fields */}
                {loginMethod === 'authtoken' && (
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="ingameName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dein Name im Spiel</FormLabel>
                          <FormControl>
                            <Input placeholder="Dein Name im Spiel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="authToken"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Auth-Token</FormLabel>
                          <FormControl>
                            <Input placeholder="Dein Auth-Token (z.B. abcdefg12345)" {...field} />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-gray-500 mt-1">
                            <Link href="/hilfe/auth-token" className="text-[#00CFFF] hover:underline">
                              Wie finde ich meinen Auth-Token?
                            </Link>
                          </p>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                {/* Facebook Login Fields */}
                {loginMethod === 'credentials' && (
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="ingameName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dein Name im Spiel</FormLabel>
                          <FormControl>
                            <Input placeholder="Dein Name im Spiel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="facebookEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook E-Mail oder Handynummer</FormLabel>
                          <FormControl>
                            <Input placeholder="E-Mail oder Handynummer für Facebook Login" {...field} />
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
                            <Input type="password" placeholder="Dein Facebook Passwort" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="recoveryCode1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Wiederherstellungscode 1</FormLabel>
                            <FormControl>
                              <Input placeholder="Erster Code" {...field} />
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
                              <Input placeholder="Zweiter Code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Boost Time */}
            <Card>
              <CardContent className="py-4">
                <h2 className="text-xl font-bold text-[#0A3A68] mt-0 mb-2">Wann soll der Boost stattfinden?</h2>
                
                <FormField
                  control={form.control}
                  name="boostTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="grid gap-2"
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="asap" id="asap" />
                            <Label htmlFor="asap" className="cursor-pointer">
                              So schnell wie möglich (innerhalb von 24h)
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="tournament" id="tournament" />
                            <Label htmlFor="tournament" className="cursor-pointer">
                              Am Turniertag (Freitags oder in den Finalrunden)
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            {/* Terms and Conditions */}
            <Card>
              <CardContent className="py-4">
                <h2 className="text-xl font-bold text-[#0A3A68] mt-0 mb-2">Rechtliches</h2>
                
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="withdrawalAccepted"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Ich verzichte ausdrücklich auf mein Widerrufsrecht für digitale Inhalte, damit die Ausführung vor Ablauf der Widerrufsfrist beginnen kann.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Ich habe die <Link href="/agb" className="text-[#00CFFF] hover:underline">AGB</Link> gelesen und bin damit einverstanden.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Zahlungsoptionen */}
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-[#0A3A68] mb-4">Zahlungsmethoden</h3>
              
              {/* PayPal Option */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="mr-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <span className="text-xs">1</span>
                  </div>
                  <h4 className="font-medium">PayPal oder Kreditkarte</h4>
                </div>
                
                <div className="pl-7 mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Zahle sicher und schnell mit PayPal oder Kreditkarte.
                  </p>
                  <div id="paypal-button-container" className="w-full max-w-md mx-auto mb-2">
                    <PayPalButtonWrapper
                      amount={selectedOption === '25000' ? '25.00' : 
                            selectedOption === '35000' ? '35.00' : 
                            selectedOption === '45000' ? '45.00' : 
                            selectedOption === 'schnupper' ? '10.00' : '15.00'}
                      currency="EUR"
                      intent="CAPTURE"
                      onPaymentComplete={async (paypalOrderId) => {
                        const formData = form.getValues();
                        
                        toast({
                          title: "Zahlung erfolgreich!",
                          description: `Deine Bestellung wurde erfolgreich bezahlt und wird verarbeitet.`,
                        });
                        
                        // Sende die Bestelldaten zusammen mit der PayPal Transaktion zum Server
                        try {
                          const response = await fetch('/api/orders', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              paymentMethod: 'paypal',
                              paymentReference: paypalOrderId,
                              paymentStatus: 'completed',
                              customerName: formData.name,
                              customerEmail: formData.email,
                              whatsappNumber: formData.whatsapp || '',
                              gameUsername: formData.ingameName,
                              productType: 'wuerfel',
                              productName: selectedOption === '25000' ? '25.000 Würfel' : 
                                          selectedOption === '35000' ? '35.000 Würfel' : 
                                          selectedOption === '45000' ? '45.000 Würfel' : 
                                          selectedOption === 'schnupper' ? 'Schnupperboost 10.000 Würfel' : 'Schnupperboost inkl. Events',
                              productDetails: JSON.stringify({
                                diceAmount: selectedOption,
                                loginMethod: formData.loginMethod,
                                boostTime: formData.boostTime,
                                authToken: formData.authToken || '',
                                fbEmail: formData.facebookEmail || '',
                                fbPassword: formData.facebookPassword || '',
                                recoveryCode1: formData.recoveryCode1 || '',
                                recoveryCode2: formData.recoveryCode2 || ''
                              }),
                              amount: selectedOption === '25000' ? '25.00' : 
                                     selectedOption === '35000' ? '35.00' : 
                                     selectedOption === '45000' ? '45.00' : 
                                     selectedOption === 'schnupper' ? '10.00' : '15.00'
                            }),
                          });
                          
                          if (response.ok) {
                            // Speichere die Bestelldaten vor der Weiterleitung für die Erfolgsseite
                            localStorage.setItem('latest_order_data', JSON.stringify({
                              productName: selectedOption === '25000' ? '25.000 Würfel' : 
                                          selectedOption === '35000' ? '35.000 Würfel' : 
                                          selectedOption === '45000' ? '45.000 Würfel' : 
                                          selectedOption === 'schnupper' ? 'Schnupperboost 10.000 Würfel' : 'Schnupperboost inkl. Events',
                              amount: selectedOption === '25000' ? '25.00' : 
                                     selectedOption === '35000' ? '35.00' : 
                                     selectedOption === '45000' ? '45.00' : 
                                     selectedOption === 'schnupper' ? '10.00' : '15.00',
                              gameUsername: formData.ingameName,
                              boostTime: formData.boostTime,
                              paymentMethod: 'PayPal'
                            }));
                            
                            // Kurze Verzögerung vor Weiterleitung
                            setTimeout(() => {
                              window.location.href = '/checkout/Erfolg';
                            }, 2000);
                          } else {
                            throw new Error("Fehler beim Erstellen der Bestellung");
                          }
                        } catch (error) {
                          console.error('Fehler beim Senden der Bestelldaten:', error);
                          toast({
                            title: "Achtung",
                            description: "Zahlung erfolgreich, aber es gab ein Problem beim Speichern deiner Bestellung. Bitte kontaktiere uns.",
                            variant: "destructive"
                          });
                        }
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Mit Klick auf den PayPal-Button wirst du zu PayPal weitergeleitet, um die Zahlung abzuschließen.
                  </p>
                </div>
              </div>
              
              {/* Alternative Zahlungsoption */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="mr-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <span className="text-xs">2</span>
                  </div>
                  <h4 className="font-medium">Alternative: Bestellung per Überweisung</h4>
                </div>
                
                <div className="pl-7">
                  <p className="text-sm text-gray-600 mb-3">
                    Bestelle jetzt und erhalte die Zahlungsdaten per E-Mail. 
                    Nach Zahlungseingang bearbeiten wir deine Bestellung sofort.
                  </p>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-[#0A3A68] hover:bg-[#072F56] px-6 py-3 font-medium"
                  >
                    Jetzt per Überweisung bestellen
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}