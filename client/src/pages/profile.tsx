import { useState } from "react";
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
import { Loader2 } from "lucide-react";
import { ProtectedRoute } from "@/lib/protected-route";

const profileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Ungültige E-Mail-Adresse").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

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

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Mein Profil</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
}

export default function ProfilePageWrapper() {
  return (
    <ProtectedRoute path="/profile" component={ProfilePage} />
  );
}