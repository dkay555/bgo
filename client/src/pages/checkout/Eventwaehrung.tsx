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

// Form schema
const checkoutSchema = z.object({
  currencyAmount: z.string({
    required_error: "Bitte wähle eine Menge an Eventwährung",
  }),
  name: z.string().min(2, {
    message: "Der Name muss mindestens 2 Zeichen lang sein",
  }),
  email: z.string().email({
    message: "Bitte gib eine gültige E-Mail-Adresse ein",
  }),
  whatsapp: z.string().optional(),
  ingameName: z.string().min(2, {
    message: "Bitte gib deinen In-Game Namen ein",
  }),
  friendCode: z.string().min(2, {
    message: "Bitte gib deinen Freundschaftslink oder -code ein",
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Du musst die AGB akzeptieren",
  }),
  withdrawalAccepted: z.boolean().refine(val => val === true, {
    message: "Du musst auf dein Widerrufsrecht verzichten",
  }),
});

type FormData = z.infer<typeof checkoutSchema>;

export default function EventwaehrungCheckout() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState('10000');

  // Versuche, gespeicherte Daten aus localStorage zu laden
  const getSavedFormData = (): Partial<FormData> => {
    try {
      const savedData = localStorage.getItem('eventwaehrung_checkout_data');
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
      currencyAmount: savedData.currencyAmount || "10000",
      name: savedData.name || user?.name || "",
      email: savedData.email || user?.email || "",
      whatsapp: savedData.whatsapp || "",
      ingameName: savedData.ingameName || "",
      friendCode: savedData.friendCode || "",
      termsAccepted: savedData.termsAccepted || false,
      withdrawalAccepted: savedData.withdrawalAccepted || false,
    },
    mode: "onChange",
  });
  
  // Setze selectedOption basierend auf den gespeicherten Daten
  useEffect(() => {
    if (savedData.currencyAmount) {
      setSelectedOption(savedData.currencyAmount);
    }
  }, []);

  const handleCurrencyAmountChange = (value: string) => {
    setSelectedOption(value);
    form.setValue("currencyAmount", value);
  };

  // Berechne den Preis basierend auf der Menge der Eventwährung
  const calculatePrice = (amount: string): number => {
    if (amount === '10000') return 20;
    if (amount === '20000') return 30;
    return 20; // Standardpreis als Fallback
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    
    // Speichere die Daten im localStorage für persistenz zwischen Seitenneuladen
    localStorage.setItem('eventwaehrung_checkout_data', JSON.stringify(data));
    
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

  const currencyOptions = [
    { value: "10000", label: "10.000 Währung", price: 20 },
    { value: "20000", label: "20.000 Währung", price: 30 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <SEOHead 
        pageName="Eventwährung kaufen - Checkout" 
        customTitle="Eventwährung kaufen - Checkout | babixGO" 
        customDescription="Eventwährung für Monopoly GO Events kaufen - Checkout"
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
            {/* Currency Amount Selection */}
            <Card>
              <CardContent className="py-4">
                <h2 className="text-xl font-bold text-[#0A3A68] mt-0 mb-2">Wie viel Eventwährung möchtest du erhalten?</h2>
                
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="currencyAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            value={selectedOption}
                            onValueChange={(val) => {
                              handleCurrencyAmountChange(val);
                            }}
                            className="grid gap-2"
                          >
                            {currencyOptions.map((option) => (
                              <div key={option.value} className="flex items-center space-x-3 w-full">
                                <RadioGroupItem value={option.value} id={`currency-${option.value}`} />
                                <Label htmlFor={`currency-${option.value}`} className="text-gray-900 flex items-center w-full cursor-pointer">
                                  <span>{option.label}</span>
                                  <span className="ml-2">💰</span>
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