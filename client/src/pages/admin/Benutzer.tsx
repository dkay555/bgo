import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RefreshCw, Edit, Trash2, Search, UserPlus, UserCheck, UserX } from "lucide-react";

// Interface für Benutzer
interface User {
  id: number;
  username: string;
  email: string | null;
  name: string | null;
  isAdmin: boolean;
  authToken: string | null;
  authTokenUpdatedAt: string | null;
  fbUsername: string | null;
  fbPassword: string | null;
  friendLink: string | null;
  ingameName: string | null;
  createdAt: string;
  updatedAt: string;
}

// Formular-Schema für die Benutzerbearbeitung
const userFormSchema = z.object({
  username: z.string().min(3, "Benutzername muss mindestens 3 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse").nullable(),
  name: z.string().nullable(),
  isAdmin: z.boolean().default(false),
  password: z.string().min(6, "Passwort muss mindestens 6 Zeichen lang sein").optional(),
  fbUsername: z.string().nullable(),
  fbPassword: z.string().nullable(),
  friendLink: z.string().nullable(),
  ingameName: z.string().nullable(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

export default function BenutzerVerwaltung() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Formular für die Benutzerbearbeitung
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      email: null,
      name: null,
      isAdmin: false,
      password: "",
    },
  });
  
  // Authentifizierung
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Sende Basic Auth Anfrage
      const response = await fetch("/api/admin/users", {
        headers: {
          "Authorization": `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
        }
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        toast({
          title: "Erfolgreich angemeldet",
          description: "Sie sind jetzt im Admin-Bereich"
        });
      } else {
        toast({
          title: "Anmeldung fehlgeschlagen",
          description: "Ungültige Anmeldedaten",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Bei der Anmeldung ist ein Fehler aufgetreten",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ username: "", password: "" });
  };
  
  // Benutzer abrufen mit useQuery
  const { 
    data: usersData, 
    isLoading: usersLoading, 
    refetch 
  } = useQuery({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const response = await fetch("/api/admin/users", {
        headers: {
          "Authorization": `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          throw new Error("Nicht authentifiziert");
        }
        throw new Error("Fehler beim Laden der Benutzer");
      }
      
      return response.json();
    },
    enabled: isAuthenticated
  });
  
  // Benutzer erstellen/aktualisieren Mutation
  const userMutation = useMutation({
    mutationFn: async (values: UserFormValues & { id?: number }) => {
      const { id, ...userData } = values;
      const isUpdate = !!id;
      
      // Entferne leere Passwörter bei Updates
      if (isUpdate && !userData.password) {
        delete userData.password;
      }
      
      const response = await fetch(
        isUpdate ? `/api/admin/users/${id}` : "/api/admin/users", 
        {
          method: isUpdate ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
          },
          body: JSON.stringify(userData)
        }
      );
      
      if (!response.ok) {
        throw new Error(`Fehler beim ${isUpdate ? "Aktualisieren" : "Erstellen"} des Benutzers`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setIsUserFormOpen(false);
      toast({
        title: "Erfolgreich",
        description: `Benutzer wurde erfolgreich ${selectedUser ? "aktualisiert" : "erstellt"}`
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: `${error}`,
        variant: "destructive"
      });
    }
  });
  
  // Benutzer löschen Mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Fehler beim Löschen des Benutzers");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setIsDeleteDialogOpen(false);
      toast({
        title: "Benutzer gelöscht",
        description: "Der Benutzer wurde erfolgreich gelöscht"
      });
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: `${error}`,
        variant: "destructive"
      });
    }
  });
  
  // Benutzer bearbeiten
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    form.reset({
      username: user.username,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      password: "", // Passwort immer leer lassen bei Bearbeitung
    });
    setIsUserFormOpen(true);
  };
  
  // Neuen Benutzer erstellen
  const handleCreateUser = () => {
    setSelectedUser(null);
    form.reset({
      username: "",
      email: null,
      name: null,
      isAdmin: false,
      password: "",
    });
    setIsUserFormOpen(true);
  };
  
  // Benutzer löschen Dialog öffnen
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };
  
  // Formular abschicken
  const onSubmit = (values: UserFormValues) => {
    if (selectedUser) {
      userMutation.mutate({ ...values, id: selectedUser.id });
    } else {
      // Passwort ist erforderlich bei Neuanmeldung
      if (!values.password) {
        form.setError("password", { 
          type: "manual", 
          message: "Passwort ist erforderlich" 
        });
        return;
      }
      userMutation.mutate(values);
    }
  };
  
  // Gefilterte Benutzer basierend auf der Suche
  const filteredUsers = usersData?.users?.filter((user: User) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      user.username.toLowerCase().includes(searchTermLower) ||
      (user.email && user.email.toLowerCase().includes(searchTermLower)) ||
      (user.name && user.name.toLowerCase().includes(searchTermLower))
    );
  }) || [];
  
  // Render Login-Formular, wenn nicht authentifiziert
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Bitte melden Sie sich an, um auf den Admin-Bereich zuzugreifen.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Benutzername
                </label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Passwort
                </label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Anmelden...
                  </>
                ) : (
                  "Anmelden"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }
  
  // Render Admin-Bereich, wenn authentifiziert
  return (
    <div className="container mx-auto p-4">
      {/* Admin-Navigation */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="flex items-center p-4">
          <h2 className="text-xl font-bold mr-6">Admin-Bereich</h2>
          <div className="flex flex-wrap gap-2">
            <a 
              href="/admin/bestellungen" 
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Bestellungen
            </a>
            <a 
              href="/admin/benutzer" 
              className="px-4 py-2 rounded-md bg-blue-100 text-blue-800 font-medium"
            >
              Benutzer
            </a>
            <a 
              href="/admin/email-vorlagen" 
              className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              E-Mail-Vorlagen
            </a>
          </div>
          <div className="ml-auto">
            <Button onClick={handleLogout} variant="outline" size="sm">
              Abmelden
            </Button>
          </div>
        </div>
      </div>
    
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Benutzerverwaltung</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Benutzer suchen..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => refetch()} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button onClick={handleCreateUser} variant="default">
            <UserPlus className="h-4 w-4 mr-2" /> Neuer Benutzer
          </Button>
        </div>
      </div>

      {usersLoading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <UserX className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Keine Benutzer gefunden</h3>
          <p className="mt-2 text-sm text-gray-500">
            Es wurden keine Benutzer gefunden, die Ihren Suchkriterien entsprechen.
          </p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Benutzername</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>E-Mail</TableHead>
                  <TableHead>Rolle</TableHead>
                  <TableHead>Erstellt am</TableHead>
                  <TableHead>Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user: User) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.name || '-'}</TableCell>
                    <TableCell>{user.email || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${user.isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {user.isAdmin ? 'Administrator' : 'Benutzer'}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      {/* Benutzer erstellen/bearbeiten Dialog */}
      <Dialog open={isUserFormOpen} onOpenChange={setIsUserFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? 'Benutzer bearbeiten' : 'Neuen Benutzer erstellen'}
            </DialogTitle>
            <DialogDescription>
              {selectedUser 
                ? 'Bearbeiten Sie die Informationen des ausgewählten Benutzers.'
                : 'Erstellen Sie einen neuen Benutzer im System.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Benutzername</FormLabel>
                    <FormControl>
                      <Input placeholder="Benutzername eingeben" {...field} />
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
                      <Input 
                        placeholder="E-Mail eingeben (optional)" 
                        {...field} 
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value || null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Namen eingeben (optional)" 
                        {...field} 
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value || null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passwort {selectedUser ? '(leer lassen für keine Änderung)' : ''}</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder={selectedUser ? "Passwort unverändert lassen" : "Passwort eingeben"} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Administrator-Rechte</FormLabel>
                      <FormDescription>
                        Benutzer erhält vollen Zugriff auf den Admin-Bereich
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsUserFormOpen(false)}
                >
                  Abbrechen
                </Button>
                <Button 
                  type="submit" 
                  disabled={userMutation.isPending}
                >
                  {userMutation.isPending ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> 
                      Speichern...
                    </>
                  ) : selectedUser ? "Aktualisieren" : "Erstellen"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Benutzer löschen Bestätigungsdialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Benutzer löschen</DialogTitle>
            <DialogDescription>
              Möchten Sie den Benutzer "{selectedUser?.username}" wirklich löschen?
              Diese Aktion kann nicht rückgängig gemacht werden.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Abbrechen
            </Button>
            <Button 
              variant="destructive"
              onClick={() => selectedUser && deleteUserMutation.mutate(selectedUser.id)}
              disabled={deleteUserMutation.isPending}
            >
              {deleteUserMutation.isPending ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> 
                  Löschen...
                </>
              ) : "Löschen bestätigen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}