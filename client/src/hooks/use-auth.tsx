import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { User } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type ProfileData = {
  name?: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<{ success: boolean; user: User }, Error, LoginData>;
  logoutMutation: UseMutationResult<{ success: boolean }, Error, void>;
  registerMutation: UseMutationResult<{ success: boolean; user: User }, Error, RegisterData>;
  saveAuthTokenMutation: UseMutationResult<{ success: boolean; user: User }, Error, { authToken: string }>;
  updateProfileMutation: UseMutationResult<{ success: boolean; user: User }, Error, ProfileData>;
};

type LoginData = {
  username: string;
  password: string;
};

type RegisterData = {
  username: string;
  password: string;
  email?: string;
  name?: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const {
    data: userResponse,
    error,
    isLoading,
  } = useQuery<{ success: boolean; user: User } | undefined, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    staleTime: 5 * 60 * 1000, // 5 Minuten
  });

  const user = userResponse?.success ? userResponse.user : null;

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(["/api/user"], data);
        toast({
          title: "Login erfolgreich",
          description: `Willkommen zurück, ${data.user.name || data.user.username}!`,
          variant: "default",
        });
      } else {
        toast({
          title: "Login fehlgeschlagen",
          description: data.message || "Bitte überprüfe deine Anmeldedaten",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Login fehlgeschlagen",
        description: error.message || "Bitte überprüfe deine Anmeldedaten",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterData) => {
      const res = await apiRequest("POST", "/api/register", credentials);
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(["/api/user"], data);
        toast({
          title: "Registrierung erfolgreich",
          description: `Willkommen, ${data.user.name || data.user.username}!`,
          variant: "default",
        });
      } else {
        toast({
          title: "Registrierung fehlgeschlagen",
          description: data.message || "Bitte überprüfe deine Eingaben",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Registrierung fehlgeschlagen",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/logout");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], { success: false, user: null });
      // Leere alle Abfragen im Cache, die möglicherweise benutzerspezifische Daten enthalten
      queryClient.removeQueries({ queryKey: ["/api/tickets"] });
      queryClient.removeQueries({ queryKey: ["/api/user/orders"] });
      toast({
        title: "Logout erfolgreich",
        description: "Du wurdest erfolgreich abgemeldet",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout fehlgeschlagen",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const saveAuthTokenMutation = useMutation({
    mutationFn: async ({ authToken }: { authToken: string }) => {
      const res = await apiRequest("POST", "/api/auth-token", { authToken });
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(["/api/user"], data);
        toast({
          title: "Auth-Token gespeichert",
          description: data.message || "Dein Auth-Token wurde erfolgreich gespeichert",
          variant: "default",
        });
      } else {
        toast({
          title: "Fehler beim Speichern des Auth-Tokens",
          description: data.message || "Bitte versuche es erneut",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler beim Speichern des Auth-Tokens",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
        saveAuthTokenMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}