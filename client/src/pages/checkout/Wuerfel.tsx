import { useState } from 'react';
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
import { PayPalButtonWrapper } from '@/components/PayPalButtonWrapper';

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
  if (data.loginMethod === "credentials") {
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

  const form = useForm<FormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      product: "25000",
      name: user?.name || "",
      email: user?.email || "",
      whatsapp: "",
      loginMethod: "authtoken",
      ingameName: "",
      authToken: "",
      facebookEmail: "",
      facebookPassword: "",
      recoveryCode1: "",
      recoveryCode2: "",
      boostTime: "asap",
      termsAccepted: false,
      withdrawalAccepted: false,
    },
  });

  const handleProductChange = (value: string) => {
    setSelectedOption(value);
    form.setValue("product", value);
    
    // Bei Schnupperboost nur Auth-Token als Login-Methode erlauben
    if (value === 'schnupper' || value === 'schnupperEvent') {
      setLoginMethod('authtoken');
      form.setValue("loginMethod", "authtoken");
    }
  };

  const handleLoginMethodChange = (value: LoginMethod) => {
    // Bei Schnupperboost nur Auth-Token erlauben
    if (selectedOption.includes('schnupper') && value !== 'authtoken') {
      return; // Nicht wechseln, wenn Schnupperboost aktiv ist
    }
    
    setLoginMethod(value);
    form.setValue("loginMethod", value, { shouldDirty: true });
    
    // Sicherstellen, dass die Produktauswahl erhalten bleibt
    form.setValue("product", selectedOption, { shouldDirty: true });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Here you would normally send the data to the server or redirect to PayPal
    toast({
      title: "Bestellung wird verarbeitet",
      description: "Du wirst zu PayPal weitergeleitet...",
    });
    
    // Redirect to PayPal would happen here
    // window.location.href = "/api/paypal/create-order";
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
                            value={field.value}
                            onValueChange={(val) => {
                              handleProductChange(val);
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
                <div className="flex flex-wrap items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-[#0A3A68] mt-0">Wie sollen wir uns einloggen?</h2>
                  <Link href="/hilfe/loginmoeglichkeiten">
                    <span className="text-[#00CFFF] text-sm hover:underline">
                      Du bist dir unsicher? Hier bekommst du mehr Infos dazu
                    </span>
                  </Link>
                </div>
                
                <div className="grid gap-6">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="authtoken"
                      name="loginMethod"
                      className="h-5 w-5 text-[#00CFFF] border-gray-300 focus:ring-[#00CFFF]"
                      checked={loginMethod === 'authtoken'}
                      onChange={() => handleLoginMethodChange('authtoken')}
                    />
                    <label htmlFor="authtoken" className="text-gray-900 font-medium">
                      Facebook Auth-Token
                    </label>
                  </div>
                  
                  {loginMethod === 'authtoken' && (
                    <div className="ml-8 grid gap-4">
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
                        name="authToken"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Auth-Token</FormLabel>
                            <FormControl>
                              <Input placeholder="Dein Facebook Auth-Token" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  {/* Nur anzeigen, wenn KEIN Schnupperboost ausgewählt ist */}
                  {!selectedOption.includes('schnupper') && (
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="credentials"
                        name="loginMethod"
                        className="h-5 w-5 text-[#00CFFF] border-gray-300 focus:ring-[#00CFFF]"
                        checked={loginMethod === 'credentials'}
                        onChange={() => handleLoginMethodChange('credentials')}
                      />
                      <label htmlFor="credentials" className="text-gray-900 font-medium">
                        Facebook Zugangsdaten
                      </label>
                    </div>
                  )}
                  
                  {loginMethod === 'credentials' && (
                    <div className="ml-8 grid gap-4">
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
                        name="facebookEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook E-Mail / Handynummer</FormLabel>
                            <FormControl>
                              <Input placeholder="Deine Facebook E-Mail oder Handynummer" {...field} />
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
                                <Input placeholder="Wiederherstellungscode" {...field} />
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
                                <Input placeholder="Wiederherstellungscode" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Boost Timing */}
            <Card>
              <CardContent className="py-4">
                <h2 className="text-xl font-bold text-[#0A3A68] mt-0 mb-2">Wann soll der Boost erfolgen?</h2>
                
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="boostTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-col space-y-3"
                          >
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="asap" id="asap" />
                              <Label htmlFor="asap" className="font-normal">Schnellstmöglich</Label>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="tournament" id="tournament" />
                              <Label htmlFor="tournament" className="font-normal">Mit dem nächsten Bahnhofsturnier</Label>
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
            
            {/* PayPal Button */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-md">
                <PayPalButtonWrapper
                  amount={selectedOption === '25000' ? '25.00' : 
                         selectedOption === '35000' ? '35.00' : 
                         selectedOption === '45000' ? '45.00' : 
                         selectedOption === 'schnupper' ? '10.00' : '15.00'}
                  currency="EUR"
                  intent="CAPTURE"
                  onPaymentComplete={async (paypalOrderId) => {
                    toast({
                      title: "Zahlung erfolgreich!",
                      description: `Deine Bestellung wurde erfolgreich bezahlt. Transaktions-ID: ${paypalOrderId}`,
                    });
                    // Hier würde man normalerweise den Server benachrichtigen
                    // await fetch('/api/orders/update-status', {...})
                  }}
                />
              </div>
              <p className="text-sm text-gray-500 text-center">
                Mit Klick auf "Jetzt kaufen" wirst du zu PayPal weitergeleitet, um die Zahlung abzuschließen.
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}