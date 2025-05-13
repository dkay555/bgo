import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect, Link } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

// Login-Formular Schema
const loginSchema = z.object({
  username: z.string().min(3, "Benutzername muss mindestens 3 Zeichen lang sein"),
  password: z.string().min(6, "Passwort muss mindestens 6 Zeichen lang sein"),
});

// Registrierungs-Formular Schema
const registerSchema = z.object({
  username: z.string().min(3, "Benutzername muss mindestens 3 Zeichen lang sein"),
  password: z.string().min(6, "Passwort muss mindestens 6 Zeichen lang sein"),
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein").optional().or(z.literal("")),
  name: z.string().optional().or(z.literal("")),
});

export default function AuthPage() {
  const { user, isLoading, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  // Admin-Login-Toggle
  const toggleAdminLogin = () => setIsAdminLogin(!isAdminLogin);

  // Login Form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register Form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      name: "",
    },
  });

  // Login Funktion
  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    // Wenn Admin-Login aktiviert ist, vermerken wir das in der Anfrage
    loginMutation.mutate({ 
      ...values, 
      isAdmin: isAdminLogin 
    });
  }

  // Registrierungs-Funktion
  function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    registerMutation.mutate(values);
  }

  // Wenn der Benutzer bereits eingeloggt ist, zur Startseite weiterleiten
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Linke Spalte: Formular */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <Card className="w-full max-w-md border border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#0A3A68]">
              {activeTab === "login" 
                ? "Einloggen" 
                : activeTab === "register" 
                  ? "Konto erstellen" 
                  : "Als Gast fortfahren"}
            </CardTitle>
            <CardDescription>
              {activeTab === "login" 
                ? "Melde dich an, um deine Bestellungen einzusehen und Support zu erhalten" 
                : activeTab === "register" 
                  ? "Erstelle ein Konto, um deine Bestellungen einfach zu verwalten"
                  : "Ohne Registrierung bestellen und einkaufen"}
            </CardDescription>
          </CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Registrieren</TabsTrigger>
              <TabsTrigger value="guest">Als Gast</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="p-4">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Benutzername</FormLabel>
                        <FormControl>
                          <Input placeholder="Dein Benutzername" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passwort</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Dein Passwort" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-[#0A3A68] hover:bg-[#072a4e]"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Anmelden...
                      </>
                    ) : (
                      "Anmelden"
                    )}
                  </Button>
                  
                  {/* Admin Login Checkbox */}
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="admin-login"
                      checked={isAdminLogin}
                      onChange={toggleAdminLogin}
                      className="h-4 w-4 text-[#0A3A68] rounded border-gray-300 focus:ring-[#0A3A68]"
                    />
                    <label htmlFor="admin-login" className="ml-2 block text-sm text-gray-700">
                      Als Administrator anmelden
                    </label>
                  </div>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="register" className="p-4">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Benutzername</FormLabel>
                        <FormControl>
                          <Input placeholder="Dein Benutzername" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Dein Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-Mail (optional)</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="deine.email@beispiel.de" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passwort</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Dein Passwort" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-[#0A3A68] hover:bg-[#072a4e]"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registrieren...
                      </>
                    ) : (
                      "Registrieren"
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            {/* Als Gast Tab-Inhalt */}
            <TabsContent value="guest" className="p-4">
              <div className="space-y-4">
                <p className="text-sm text-gray-700 mb-4">
                  Sie können auch ohne Registrierung bei uns bestellen. Beachten Sie jedoch, 
                  dass Sie ohne Konto Ihre Bestellungen nicht in einer Übersicht einsehen können.
                </p>
                
                <div className="grid gap-3">
                  <Link to="/checkout/wuerfel" className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                    <span className="material-icons mr-3 text-[#0A3A68]">casino</span>
                    <div>
                      <h3 className="font-medium">Würfelboost</h3>
                      <p className="text-sm text-gray-500">Würfel für Monopoly GO erhalten</p>
                    </div>
                  </Link>
                  
                  <Link to="/checkout/partnerevent" className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                    <span className="material-icons mr-3 text-[#0A3A68]">people</span>
                    <div>
                      <h3 className="font-medium">Partnerevent</h3>
                      <p className="text-sm text-gray-500">Mit Partnern Monopoly GO spielen</p>
                    </div>
                  </Link>
                  
                  <Link to="/checkout/sticker" className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                    <span className="material-icons mr-3 text-[#0A3A68]">image</span>
                    <div>
                      <h3 className="font-medium">Sticker</h3>
                      <p className="text-sm text-gray-500">Sticker für Sammlungen</p>
                    </div>
                  </Link>
                  
                  <Link to="/checkout/tycoonracers" className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                    <span className="material-icons mr-3 text-[#0A3A68]">directions_car</span>
                    <div>
                      <h3 className="font-medium">Tycoon Racers</h3>
                      <p className="text-sm text-gray-500">Tycoon Racers Event</p>
                    </div>
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <CardFooter className="flex flex-col space-y-2 p-6 border-t">
            <p className="text-sm text-gray-500">
              Mit der Anmeldung akzeptierst du unsere{" "}
              <Link href="/agb" className="text-[#0A3A68] hover:underline">
                AGB
              </Link>{" "}
              und{" "}
              <Link href="/datenschutz" className="text-[#0A3A68] hover:underline">
                Datenschutzrichtlinien
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Rechte Spalte: Hero Bereich */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0A3A68] to-[#00CFFF] p-8 md:p-12 flex flex-col justify-center">
        <div className="max-w-lg mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Willkommen bei babixGO</h1>
          <p className="text-lg md:text-xl mb-6">
            Dein persönlicher Monopoly GO Support - schnell, zuverlässig und sicher.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Bestellhistorie</h3>
                <p>Behalte den Überblick über all deine Würfelbestellungen</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Auth-Token speichern</h3>
                <p>Speichere deine Auth-Token sicher für zukünftige Bestellungen</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Support-Tickets</h3>
                <p>Erhalte schnellen und persönlichen Support bei Fragen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}