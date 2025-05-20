import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { User } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { 
  User as UserIcon, 
  Mail, 
  UserCog,
  AlertTriangle,
  Search,
  RefreshCw,
  Eye,
  SquarePen,
  Trash2,
  Shield,
  UserPlus
} from "lucide-react";

export default function NewBenutzer() {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userUpdateData, setUserUpdateData] = useState({
    name: "",
    email: "",
    isAdmin: false
  });

  // Abfrage für alle Benutzer
  const { data: users, isLoading: usersLoading, refetch } = useQuery<{ success: boolean, users: User[] }>({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const response = await fetch("/api/admin/users");
      
      if (!response.ok) {
        throw new Error("Fehler beim Laden der Benutzer");
      }
      
      return response.json();
    },
    enabled: !!currentUser?.isAdmin
  });

  // Mutation zum Aktualisieren eines Benutzers
  const updateUserMutation = useMutation({
    mutationFn: async (userData: { id: number, name?: string, email?: string, isAdmin?: boolean }) => {
      const { id, ...data } = userData;
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren des Benutzers");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Benutzer aktualisiert",
        description: "Der Benutzer wurde erfolgreich aktualisiert."
      });
      setIsDetailOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: `${error}`,
        variant: "destructive"
      });
    }
  });
  
  // Mutation zum Löschen eines Benutzers
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error("Fehler beim Löschen des Benutzers");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Benutzer gelöscht",
        description: "Der Benutzer wurde erfolgreich gelöscht."
      });
      setIsDeleteDialogOpen(false);
      setIsDetailOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: `${error}`,
        variant: "destructive"
      });
    }
  });

  // Funktion zum Öffnen der Detailansicht
  const openUserDetail = (user: User) => {
    setSelectedUser(user);
    setUserUpdateData({
      name: user.name || "",
      email: user.email || "",
      isAdmin: user.isAdmin || false
    });
    setIsDetailOpen(true);
  };
  
  // Funktion zum Aktualisieren eines Benutzers
  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    
    try {
      await updateUserMutation.mutateAsync({
        id: selectedUser.id,
        ...userUpdateData
      });
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Benutzers:", error);
    }
  };
  
  // Funktion zum Löschen eines Benutzers
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      await deleteUserMutation.mutateAsync(selectedUser.id);
    } catch (error) {
      console.error("Fehler beim Löschen des Benutzers:", error);
    }
  };

  // Gefilterte Benutzer basierend auf der Suche
  const filteredUsers = users?.users.filter(user => {
    if (!searchTerm) return true;
    
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (user.username?.toLowerCase().includes(searchTermLower) || false) ||
      (user.name?.toLowerCase().includes(searchTermLower) || false) ||
      (user.email?.toLowerCase().includes(searchTermLower) || false)
    );
  }) || [];

  // Anzahl der Administratoren ermitteln
  const adminCount = users?.users.filter(user => user.isAdmin).length || 0;

  // Formatieren des Datums
  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Statistik-Übersicht */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Gesamt Benutzer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserIcon className="h-8 w-8 text-blue-500 mr-3" />
              <div className="text-2xl font-bold">{users?.users.length || 0}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Administratoren</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-500 mr-3" />
              <div className="text-2xl font-bold">{adminCount}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Standard Benutzer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserIcon className="h-8 w-8 text-green-500 mr-3" />
              <div className="text-2xl font-bold">{(users?.users.length || 0) - adminCount}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Such- und Aktionsbereich */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-auto relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Suchen nach Benutzername, Name, E-Mail..."
              className="pl-8 w-full sm:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              onClick={() => refetch()} 
              variant="outline" 
              disabled={usersLoading}
              className="w-full sm:w-auto"
            >
              {usersLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Aktualisieren
            </Button>
            
            <Button className="w-full sm:w-auto">
              <UserPlus className="h-4 w-4 mr-2" />
              Neuer Benutzer
            </Button>
          </div>
        </div>
      </div>
      
      {/* Benutzertabelle */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Benutzerliste</CardTitle>
          <CardDescription>
            {filteredUsers.length} Benutzer gefunden
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {usersLoading ? (
            <div className="flex justify-center items-center h-64">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <UserIcon className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Keine Benutzer gefunden</h3>
              <p className="mt-2 text-sm text-gray-500">
                Es wurden keine Benutzer gefunden, die Ihren Suchkriterien entsprechen.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Benutzername</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>E-Mail</TableHead>
                    <TableHead>Registriert am</TableHead>
                    <TableHead>Rolle</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.name || "-"}</TableCell>
                      <TableCell>{user.email || "-"}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>
                        {user.isAdmin ? (
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            Administrator
                          </span>
                        ) : (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Benutzer
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openUserDetail(user)}
                            title="Benutzer bearbeiten"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Benutzer-Detailansicht Dialog */}
      {selectedUser && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Benutzer bearbeiten</DialogTitle>
              <DialogDescription>
                Bearbeiten Sie die Informationen und Berechtigungen des Benutzers.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="flex flex-col items-center space-y-2 pb-4 border-b">
                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-gray-400" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium">{selectedUser.username}</h3>
                  <p className="text-sm text-gray-500">ID: {selectedUser.id}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={userUpdateData.name}
                    onChange={(e) => setUserUpdateData({...userUpdateData, name: e.target.value})}
                    placeholder="Name eingeben"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userUpdateData.email}
                    onChange={(e) => setUserUpdateData({...userUpdateData, email: e.target.value})}
                    placeholder="E-Mail eingeben"
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2 pt-2">
                  <Label htmlFor="admin-status" className="flex-1">Administrator-Rechte</Label>
                  <Switch
                    id="admin-status"
                    checked={userUpdateData.isAdmin}
                    onCheckedChange={(checked) => setUserUpdateData({...userUpdateData, isAdmin: checked})}
                  />
                </div>
                
                {currentUser?.id === selectedUser.id && userUpdateData.isAdmin === false && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Warnung: Sie sind dabei, Ihre eigenen Administrator-Rechte zu entfernen!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter className="flex justify-between">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-red-600 hover:text-red-800 border-red-200 hover:border-red-300 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Löschen
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Abbrechen
                </Button>
                <Button 
                  onClick={handleUpdateUser}
                  disabled={updateUserMutation.isPending}
                >
                  {updateUserMutation.isPending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Wird gespeichert...
                    </>
                  ) : (
                    <>Speichern</>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Bestätigungsdialog zum Löschen */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Benutzer löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Möchten Sie diesen Benutzer wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
              {selectedUser?.isAdmin && (
                <p className="mt-2 text-yellow-600 font-semibold">
                  Achtung: Sie löschen einen Administrator-Account!
                </p>
              )}
              {currentUser?.id === selectedUser?.id && (
                <p className="mt-2 text-red-600 font-semibold">
                  Warnung: Sie sind dabei, Ihren eigenen Account zu löschen!
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteUser}
              className="bg-red-500 hover:bg-red-600"
              disabled={deleteUserMutation.isPending}
            >
              {deleteUserMutation.isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Wird gelöscht...
                </>
              ) : (
                <>Löschen</>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}