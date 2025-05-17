import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/layouts/MainLayout";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import StartPage from "@/pages/StartPage";
import BlogPost from "@/pages/BlogPost";
import News from "@/pages/News";
import Kontakt from "@/pages/Kontakt";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import AGB from "@/pages/AGB";
import Widerruf from "@/pages/Widerruf";
import Hilfe from "@/pages/Hilfe";
import Produkte from "@/pages/Produkte";
import Preise from "@/pages/Preise";
import AuthPage from "@/pages/auth-page";
import OrderHistory from "@/pages/order-history";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

// Lazy loading für Unterseiten, die nicht sofort benötigt werden
import { lazy, Suspense } from "react";

// Lazy-loaded product pages
const WuerfelPage = lazy(() => import('@/pages/produkte/Wuerfel'));
const StickerPage = lazy(() => import('@/pages/produkte/Sticker'));
const PartnerPage = lazy(() => import('@/pages/produkte/Partner'));
const TycoonRacersPage = lazy(() => import('@/pages/produkte/TycoonRacers'));
const WeiterePage = lazy(() => import('@/pages/produkte/Weitere'));

// Lazy-loaded checkout pages
const WuerfelCheckoutPage = lazy(() => import('@/pages/checkout/Wuerfel'));
const StickerCheckoutPage = lazy(() => import('@/pages/checkout/Sticker'));
const PartnereventCheckoutPage = lazy(() => import('@/pages/checkout/Partnerevent'));
const TycoonRacersCheckoutPage = lazy(() => import('@/pages/checkout/TycoonRacers'));
const EventwaehrungCheckoutPage = lazy(() => import('@/pages/checkout/Eventwaehrung'));

// Lazy-loaded help pages
const WuerfelHilfePage = lazy(() => import('@/pages/hilfe/wuerfel'));
const PartnerHilfePage = lazy(() => import('@/pages/hilfe/partner'));
const RaceHilfePage = lazy(() => import('@/pages/hilfe/race'));
const LoginHilfePage = lazy(() => import('@/pages/hilfe/login'));
const AccountsHilfePage = lazy(() => import('@/pages/hilfe/accounts'));
const AuthTokenHilfePage = lazy(() => import('@/pages/hilfe/authtoken'));
const AuthTokenToolPage = lazy(() => import('@/pages/hilfe/authtoken-tool'));
const NewsPreiseAngebotPage = lazy(() => import('@/pages/hilfe/news_preise_angebot'));

// Lazy-loaded ticket pages
const TicketsPage = lazy(() => import('@/pages/tickets'));
const NewTicketPage = lazy(() => import('@/pages/tickets/new'));
const TicketDetailPage = lazy(() => import('@/pages/tickets/[id]'));

// User account pages
const ProfilePage = lazy(() => import('@/pages/profile'));

// Admin pages
const AdminBestellungenPage = lazy(() => import('@/pages/admin/Bestellungen'));
const AdminBenutzerPage = lazy(() => import('@/pages/admin/Benutzer'));
const AdminEmailVorlagenPage = lazy(() => import('@/pages/admin/EmailVorlagen'));

// Test pages
const PayPalTestPage = lazy(() => import('@/pages/PayPalTest'));
const SmoothLoadExamplePage = lazy(() => import('@/pages/SmoothLoadExample'));

import { DiceSpinner } from '@/components/DiceSpinner';

const Ladebildschirm = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="mx-auto mb-4 flex justify-center">
        <DiceSpinner size={60} color="#00CFFF" secondaryColor="#FF4C00" />
      </div>
      <p className="text-[#0A3A68] font-bold">Wird geladen...</p>
    </div>
  </div>
);

function Router() {
  return (
    <MainLayout>
      <Suspense fallback={<Ladebildschirm />}>
        <Switch>
          {/* Hauptseiten */}
          <Route path="/" component={StartPage} />
          <Route path="/landing" component={LandingPage} />
          <Route path="/blog" component={BlogPost} />
          <Route path="/news" component={News} />
          <Route path="/produkte" component={Produkte} />
          <Route path="/preise" component={Preise} />
          
          {/* Rechtliche Seiten */}
          <Route path="/kontakt" component={Kontakt} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/datenschutz" component={Datenschutz} />
          <Route path="/agb" component={AGB} />
          <Route path="/widerruf" component={Widerruf} />
          
          {/* Hilfebereich */}
          <Route path="/hilfe" component={Hilfe} />
          <Route path="/hilfe/wuerfel">
            {() => <WuerfelHilfePage />}
          </Route>
          <Route path="/hilfe/partner">
            {() => <PartnerHilfePage />}
          </Route>
          <Route path="/hilfe/race">
            {() => <RaceHilfePage />}
          </Route>
          <Route path="/hilfe/login">
            {() => <LoginHilfePage />}
          </Route>
          <Route path="/hilfe/accounts">
            {() => <AccountsHilfePage />}
          </Route>
          <Route path="/hilfe/authtoken">
            {() => <AuthTokenHilfePage />}
          </Route>
          <Route path="/hilfe/authtoken-tool">
            {() => <AuthTokenToolPage />}
          </Route>
          <Route path="/hilfe/news_preise_angebot.html">
            {() => <NewsPreiseAngebotPage />}
          </Route>
          
          {/* Produkt-Unterseiten */}
          <Route path="/produkte/wuerfel">
            {() => <WuerfelPage />}
          </Route>
          <Route path="/produkte/sticker">
            {() => <StickerPage />}
          </Route>
          <Route path="/produkte/partner">
            {() => <PartnerPage />}
          </Route>
          <Route path="/produkte/race">
            {() => <TycoonRacersPage />}
          </Route>
          <Route path="/produkte/tycoonracers">
            {() => <TycoonRacersPage />}
          </Route>
          <Route path="/produkte/weitere">
            {() => <WeiterePage />}
          </Route>
          
          {/* Checkout-Seiten */}
          <Route path="/checkout/wuerfel">
            {() => <WuerfelCheckoutPage />}
          </Route>
          <Route path="/checkout/sticker">
            {() => <StickerCheckoutPage />}
          </Route>
          <Route path="/checkout/partnerevent">
            {() => <PartnereventCheckoutPage />}
          </Route>
          <Route path="/checkout/tycoonracers">
            {() => <TycoonRacersCheckoutPage />}
          </Route>
          <Route path="/checkout/eventwaehrung">
            {() => <EventwaehrungCheckoutPage />}
          </Route>
          
          {/* Auth-Routen */}
          <Route path="/auth" component={AuthPage} />
          <ProtectedRoute path="/order-history" component={OrderHistory} />
          <Route path="/profile">
            {() => <ProfilePage />}
          </Route>
          
          {/* Ticket-System */}
          <Route path="/tickets">
            {() => <TicketsPage />}
          </Route>
          <Route path="/tickets/new">
            {() => <NewTicketPage />}
          </Route>
          <Route path="/tickets/:id">
            {params => <TicketDetailPage id={params.id} />}
          </Route>
          
          {/* Admin-Bereich */}
          <Route path="/admin/bestellungen">
            {() => <AdminBestellungenPage />}
          </Route>
          <Route path="/admin/benutzer">
            {() => <AdminBenutzerPage />}
          </Route>
          <Route path="/admin/email-vorlagen">
            {() => <AdminEmailVorlagenPage />}
          </Route>
          
          {/* Test-Seiten */}
          <Route path="/paypal-test">
            {() => <PayPalTestPage />}
          </Route>
          <Route path="/lazy-load-example">
            {() => <SmoothLoadExamplePage />}
          </Route>
          
          {/* 404-Seite für alle unbekannten Routen */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
