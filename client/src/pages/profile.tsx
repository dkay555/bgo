import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, Eye, EyeOff, Copy, Check, Save } from "lucide-react";
import { ProtectedRoute } from "@/lib/protected-route";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const profileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Ungültige E-Mail-Adresse").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Spielerdaten-Formular
  const [gameData, setGameData] = useState({
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
  const [savingAuthToken, setSavingAuthToken] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    // Lade gespeicherte Spieldaten aus dem localStorage
    const savedProfile = localStorage.getItem('userGameProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setGameData(prev => ({
          ...prev,
          ...parsedProfile
        }));
      } catch (e) {
        console.error('Fehler beim Laden des Profils:', e);
      }
    }
    
    // Wenn Benutzer authentifiziert ist, lade Auth-Token
    if (user?.authToken) {
      setGameData(prev => ({
        ...prev,
        authToken: user.authToken
      }));
    }
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const res = await apiRequest("PATCH", "/api/user/profile", data);
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(["/api/user"], data);
        toast({
          title: "Profil aktualisiert",
          description: "Deine persönlichen Daten wurden erfolgreich aktualisiert.",
        });
        setIsEditing(false);
      } else {
        toast({
          title: "Fehler",
          description: data.message || "Ein Fehler ist aufgetreten.",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: error.message || "Ein Fehler ist aufgetreten.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    updateProfileMutation.mutate(data);
  };

  const handleEdit = () => {
    setIsEditing(true);
    reset({
      name: user?.name || "",
      email: user?.email || "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset({
      name: user?.name || "",
      email: user?.email || "",
    });
  };

  const handleGameDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGameData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveGameData = async () => {
    setSaving(true);
    
    try {
      // Speichere Spieldaten nur lokal im Browser
      localStorage.setItem('userGameProfile', JSON.stringify(gameData));
      
      toast({
        title: "Spielerdaten gespeichert",
        description: "Deine Monopoly GO Daten wurden lokal in deinem Browser gespeichert.",
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

  const saveAuthToken = async () => {
    if (!user || !gameData.authToken) {
      toast({
        title: "Fehler",
        description: "Du musst eingeloggt sein und einen gültigen Auth-Token eingeben.",
        variant: "destructive"
      });
      return;
    }

    setSavingAuthToken(true);
    
    try {
      const response = await fetch('/api/user/authtoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authToken: gameData.authToken }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Auth-Token gespeichert",
          description: "Dein Auth-Token wurde erfolgreich in deinem Konto gespeichert.",
          variant: "success"
        });
      } else {
        throw new Error(data.message || "Fehler beim Speichern des Auth-Tokens");
      }
    } catch (error) {
      console.error("Fehler beim Speichern des Auth-Tokens:", error);
      toast({
        title: "Fehler beim Speichern",
        description: error instanceof Error ? error.message : "Dein Auth-Token konnte nicht gespeichert werden.",
        variant: "destructive"
      });
    } finally {
      setSavingAuthToken(false);
    }
  };

  const copyAuthToken = () => {
    navigator.clipboard.writeText(gameData.authToken);
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
    <div className="container py-10">
      <h1 className="babix-info-header font-bold text-2xl md:text-3xl text-center mb-8">
        Mein Profil
      </h1>
      
      <Tabs defaultValue="personal" className="max-w-4xl mx-auto" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Persönliche Daten</TabsTrigger>
          <TabsTrigger value="gamedata">Spielerdaten</TabsTrigger>
          <TabsTrigger value="security">Konto-Sicherheit</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Persönliche Daten</CardTitle>
              <CardDescription>
                Hier kannst du deine persönlichen Daten einsehen und bearbeiten.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Benutzername</Label>
                    <Input 
                      id="username" 
                      value={user?.username || ""} 
                      disabled 
                      className="bg-muted/50"
                    />
                    <p className="text-sm text-muted-foreground">
                      Der Benutzername kann nicht geändert werden.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name"
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted/50" : ""}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input 
                      id="email"
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted/50" : ""}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    Abbrechen
                  </Button>
                  <Button 
                    type="submit"
                    form="profile-form"
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Speichern...
                      </>
                    ) : (
                      "Speichern"
                    )}
                  </Button>
                </>
              ) : (
                <Button onClick={handleEdit}>Bearbeiten</Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="gamedata" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Meine Monopoly GO Daten</CardTitle>
              <CardDescription>
                Hier kannst du deine Spieldaten für Monopoly GO speichern.
              </CardDescription>
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
                    value={gameData.ingameName}
                    onChange={handleGameDataChange}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="friendLink">Freundschaftslink</Label>
                  <Input 
                    id="friendLink"
                    name="friendLink"
                    placeholder="Dein Freundschaftslink aus Monopoly GO"
                    value={gameData.friendLink}
                    onChange={handleGameDataChange}
                  />
                </div>
                
                <Separator className="my-2" />
                
                <div className="grid gap-2">
                  <Label htmlFor="phoneNumber">E-Mail / Handynummer für Login</Label>
                  <Input 
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Deine E-Mail oder Handynummer für den Login"
                    value={gameData.phoneNumber}
                    onChange={handleGameDataChange}
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
                      value={gameData.fbPassword}
                      onChange={handleGameDataChange}
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
                        value={gameData.authToken}
                        onChange={handleGameDataChange}
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
                
                {user && (
                  <Button 
                    className="w-full mt-2 bg-[#009FC4] hover:bg-[#00CFFF]" 
                    onClick={saveAuthToken}
                    disabled={savingAuthToken || !gameData.authToken}
                  >
                    {savingAuthToken ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin h-4 w-4" />
                        Token wird gespeichert...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Save size={18} />
                        Auth-Token im Konto speichern
                      </span>
                    )}
                  </Button>
                )}
              </div>
              
              <Button 
                className="w-full mt-4 bg-[#00CFFF] hover:bg-[#009FC4]" 
                onClick={saveGameData}
                disabled={saving}
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Speichern...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save size={18} />
                    Spieldaten speichern
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Konto-Sicherheit</CardTitle>
              <CardDescription>
                Informationen zur Sicherheit deines Kontos und Login-Daten.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Passwort</h3>
                <p className="text-sm text-muted-foreground">
                  Aus Sicherheitsgründen wird dein Passwort nicht angezeigt.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Konto erstellt am</h3>
                <p className="text-sm">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Letztes Update</h3>
                <p className="text-sm">
                  {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : ""}
                </p>
              </div>

              {user?.authToken && (
                <div>
                  <h3 className="font-medium">Auth-Token</h3>
                  <p className="text-sm">
                    {user.authTokenUpdatedAt 
                      ? `Aktualisiert am ${new Date(user.authTokenUpdatedAt).toLocaleDateString()}`
                      : "Auth-Token vorhanden"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function ProfilePageWrapper() {
  return (
    <ProtectedRoute path="/profile" component={ProfilePage} />
  );
}