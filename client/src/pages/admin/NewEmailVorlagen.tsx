import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { EmailTemplate } from "@shared/schema";
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
  Mail, 
  Search, 
  RefreshCw, 
  Eye, 
  PlusCircle, 
  Trash2, 
  Save,
  Send,
  FileText,
  Tag
} from "lucide-react";

export default function NewEmailVorlagen() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  // Anpassung an das tatsächliche EmailTemplate-Schema
  const [templateData, setTemplateData] = useState({
    id: 0,
    name: "",
    subject: "",
    content: "",
    templateKey: ""
  });
  const [previewMode, setPreviewMode] = useState(false);

  // Abfrage für alle E-Mail-Vorlagen
  const { data: templates, isLoading: templatesLoading, refetch } = useQuery<{ success: boolean, templates: EmailTemplate[] }>({
    queryKey: ["/api/admin/email-templates"],
    queryFn: async () => {
      const response = await fetch("/api/admin/email-templates");
      
      if (!response.ok) {
        throw new Error("Fehler beim Laden der E-Mail-Vorlagen");
      }
      
      return response.json();
    },
    enabled: !!user?.isAdmin
  });

  // Mutation zum Aktualisieren einer E-Mail-Vorlage
  const updateTemplateMutation = useMutation({
    mutationFn: async (data: { id: number, name: string, subject: string, body: string, templateKey: string }) => {
      const { id, ...templateData } = data;
      const response = await fetch(`/api/admin/email-templates/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(templateData)
      });
      
      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren der E-Mail-Vorlage");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/email-templates"] });
      toast({
        title: "E-Mail-Vorlage aktualisiert",
        description: "Die E-Mail-Vorlage wurde erfolgreich aktualisiert."
      });
      setIsTemplateOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: `${error}`,
        variant: "destructive"
      });
    }
  });
  
  // Mutation zum Erstellen einer neuen E-Mail-Vorlage
  const createTemplateMutation = useMutation({
    mutationFn: async (data: { name: string, subject: string, body: string, templateKey: string }) => {
      const response = await fetch("/api/admin/email-templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error("Fehler beim Erstellen der E-Mail-Vorlage");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/email-templates"] });
      toast({
        title: "E-Mail-Vorlage erstellt",
        description: "Die E-Mail-Vorlage wurde erfolgreich erstellt."
      });
      setIsTemplateOpen(false);
      setIsCreatingNew(false);
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: `${error}`,
        variant: "destructive"
      });
    }
  });
  
  // Mutation zum Löschen einer E-Mail-Vorlage
  const deleteTemplateMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/email-templates/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error("Fehler beim Löschen der E-Mail-Vorlage");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/email-templates"] });
      toast({
        title: "E-Mail-Vorlage gelöscht",
        description: "Die E-Mail-Vorlage wurde erfolgreich gelöscht."
      });
      setIsDeleteDialogOpen(false);
      setIsTemplateOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: `${error}`,
        variant: "destructive"
      });
    }
  });

  // Funktion zum Öffnen einer Vorlage
  const openTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setTemplateData({
      id: template.id,
      name: template.name,
      subject: template.subject,
      content: template.content,
      templateKey: template.templateKey
    });
    setIsCreatingNew(false);
    setPreviewMode(false);
    setIsTemplateOpen(true);
  };
  
  // Funktion zum Erstellen einer neuen Vorlage
  const createNewTemplate = () => {
    setSelectedTemplate(null);
    setTemplateData({
      id: 0,
      name: "",
      subject: "",
      content: "",
      templateKey: ""
    });
    setIsCreatingNew(true);
    setPreviewMode(false);
    setIsTemplateOpen(true);
  };
  
  // Funktion zum Speichern einer Vorlage
  const handleSaveTemplate = async () => {
    if (!templateData.name || !templateData.subject || !templateData.content || !templateData.templateKey) {
      toast({
        title: "Fehlende Daten",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      if (isCreatingNew) {
        await createTemplateMutation.mutateAsync({
          name: templateData.name,
          subject: templateData.subject,
          body: templateData.content,
          templateKey: templateData.templateKey
        });
      } else {
        await updateTemplateMutation.mutateAsync({
          id: templateData.id,
          name: templateData.name,
          subject: templateData.subject,
          body: templateData.content,
          templateKey: templateData.templateKey
        });
      }
    } catch (error) {
      console.error("Fehler beim Speichern der Vorlage:", error);
    }
  };
  
  // Funktion zum Löschen einer Vorlage
  const handleDeleteTemplate = async () => {
    if (!selectedTemplate) return;
    
    try {
      await deleteTemplateMutation.mutateAsync(selectedTemplate.id);
    } catch (error) {
      console.error("Fehler beim Löschen der Vorlage:", error);
    }
  };

  // Gefilterte Vorlagen basierend auf der Suche
  const filteredTemplates = templates?.templates.filter(template => {
    if (!searchTerm) return true;
    
    const searchTermLower = searchTerm.toLowerCase();
    return (
      template.name.toLowerCase().includes(searchTermLower) ||
      template.subject.toLowerCase().includes(searchTermLower) ||
      template.templateKey.toLowerCase().includes(searchTermLower)
    );
  }) || [];

  // Vorschau der E-Mail-Vorlage mit Platzhalterersetzung
  const getPreviewWithPlaceholders = () => {
    let preview = templateData.content;
    
    // Ersetze Platzhalter mit Beispieldaten
    preview = preview.replace(/\{\{name\}\}/g, "Max Mustermann");
    preview = preview.replace(/\{\{email\}\}/g, "max@example.com");
    preview = preview.replace(/\{\{orderId\}\}/g, "12345");
    preview = preview.replace(/\{\{orderDate\}\}/g, new Date().toLocaleDateString("de-DE"));
    preview = preview.replace(/\{\{amount\}\}/g, "19,99 €");
    preview = preview.replace(/\{\{product\}\}/g, "1000 Würfel");
    preview = preview.replace(/\{\{ingameName\}\}/g, "Player123");
    
    return preview;
  };

  return (
    <div className="space-y-6">
      {/* Such- und Aktionsbereich */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-auto relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Suchen nach Name, Betreff, Schlüssel..."
              className="pl-8 w-full sm:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              onClick={() => refetch()} 
              variant="outline" 
              disabled={templatesLoading}
              className="w-full sm:w-auto"
            >
              {templatesLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Aktualisieren
            </Button>
            
            <Button 
              onClick={createNewTemplate}
              className="w-full sm:w-auto"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Neue Vorlage
            </Button>
          </div>
        </div>
      </div>
      
      {/* Vorlagentabelle */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>E-Mail-Vorlagen</CardTitle>
          <CardDescription>
            Verwalten Sie Ihre E-Mail-Vorlagen für automatisierte Nachrichten
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {templatesLoading ? (
            <div className="flex justify-center items-center h-64">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Mail className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Keine Vorlagen gefunden</h3>
              <p className="mt-2 text-sm text-gray-500">
                Es wurden keine E-Mail-Vorlagen gefunden, die Ihren Suchkriterien entsprechen.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Betreff</TableHead>
                    <TableHead>Schlüssel</TableHead>
                    <TableHead>Zuletzt geändert</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.id}</TableCell>
                      <TableCell>{template.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{template.subject}</TableCell>
                      <TableCell>
                        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                          {template.templateKey}
                        </code>
                      </TableCell>
                      <TableCell>{new Date(template.updatedAt).toLocaleDateString("de-DE")}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => openTemplate(template)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> 
                          Bearbeiten
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vorlage bearbeiten Dialog */}
      <Dialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreatingNew ? "Neue E-Mail-Vorlage erstellen" : "E-Mail-Vorlage bearbeiten"}
            </DialogTitle>
            <DialogDescription>
              {isCreatingNew 
                ? "Erstellen Sie eine neue E-Mail-Vorlage für Systembenachrichtigungen." 
                : "Bearbeiten Sie die ausgewählte E-Mail-Vorlage und deren Inhalt."}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={previewMode ? "preview" : "edit"} onValueChange={(v) => setPreviewMode(v === "preview")}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="edit">Bearbeiten</TabsTrigger>
              <TabsTrigger value="preview">Vorschau</TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name der Vorlage</Label>
                  <Input
                    id="name"
                    value={templateData.name}
                    onChange={(e) => setTemplateData({...templateData, name: e.target.value})}
                    placeholder="Name der Vorlage"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="templateKey">Vorlagenschlüssel</Label>
                  <div className="relative">
                    <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="templateKey"
                      value={templateData.templateKey}
                      onChange={(e) => setTemplateData({...templateData, templateKey: e.target.value})}
                      placeholder="Eindeutiger Schlüssel (z.B. order_confirmation)"
                      className="pl-8"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Ein eindeutiger Schlüssel zur Identifizierung der Vorlage im System
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Betreff</Label>
                <Input
                  id="subject"
                  value={templateData.subject}
                  onChange={(e) => setTemplateData({...templateData, subject: e.target.value})}
                  placeholder="Betreff der E-Mail"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="body">E-Mail-Inhalt</Label>
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-gray-100 border-b px-3 py-2 flex justify-between items-center">
                    <span className="text-sm font-medium">HTML-Inhalt</span>
                    <div className="text-xs text-gray-500">
                      Verwenden Sie Platzhalter wie {{name}}, {{email}}, usw.
                    </div>
                  </div>
                  <textarea
                    id="body"
                    value={templateData.body}
                    onChange={(e) => setTemplateData({...templateData, body: e.target.value})}
                    placeholder="HTML-Inhalt der E-Mail"
                    className="w-full p-3 min-h-[300px] font-mono text-sm"
                  />
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-sm">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-blue-800">Verfügbare Platzhalter:</h3>
                      <div className="mt-2 text-blue-700 grid grid-cols-2 gap-2">
                        <code>{{name}}</code>
                        <code>{{email}}</code>
                        <code>{{orderId}}</code>
                        <code>{{orderDate}}</code>
                        <code>{{amount}}</code>
                        <code>{{product}}</code>
                        <code>{{ingameName}}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      E-Mail-Vorschau
                    </CardTitle>
                    <CardDescription>
                      So wird die E-Mail mit Beispieldaten angezeigt
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-gray-100 border-b px-4 py-2">
                        <div className="font-medium">Betreff: {templateData.subject}</div>
                        <div className="text-sm text-gray-500">
                          Von: babixGO &lt;noreply@babixgo.de&gt;
                        </div>
                        <div className="text-sm text-gray-500">
                          An: Max Mustermann &lt;max@example.com&gt;
                        </div>
                      </div>
                      <div 
                        className="p-4 bg-white"
                        dangerouslySetInnerHTML={{ __html: getPreviewWithPlaceholders() }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="flex justify-between">
            {!isCreatingNew && (
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-red-600 hover:text-red-800 border-red-200 hover:border-red-300 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Löschen
              </Button>
            )}
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsTemplateOpen(false)}
              >
                Abbrechen
              </Button>
              <Button 
                onClick={handleSaveTemplate}
                disabled={updateTemplateMutation.isPending || createTemplateMutation.isPending}
              >
                {(updateTemplateMutation.isPending || createTemplateMutation.isPending) ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Wird gespeichert...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Vorlage speichern
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bestätigungsdialog zum Löschen */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>E-Mail-Vorlage löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Möchten Sie diese E-Mail-Vorlage wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
              <div className="mt-2 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
                <p className="font-medium">Achtung</p>
                <p className="text-sm">
                  Das Löschen dieser Vorlage kann dazu führen, dass einige E-Mail-Benachrichtigungen nicht mehr gesendet werden können.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteTemplate}
              className="bg-red-500 hover:bg-red-600"
              disabled={deleteTemplateMutation.isPending}
            >
              {deleteTemplateMutation.isPending ? (
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