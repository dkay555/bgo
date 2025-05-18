import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/layouts/MainLayout";
import NotFound from "@/pages/not-found";
import StartPage from "@/pages/StartPage";
import News from "@/pages/News";
import Kontakt from "@/pages/Kontakt";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import AGB from "@/pages/AGB";
import Widerruf from "@/pages/Widerruf";

import Preise from "@/pages/Preise";
import Shop from "@/pages/Shop";
import AuthPage from "@/pages/auth-page";
import OrderHistory from "@/pages/order-history";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { ScrollToTop } from "@/components/ScrollToTop";

// Lazy loading für Unterseiten, die nicht sofort benötigt werden
import { lazy, Suspense } from "react";

// Sitemap
const SitemapPage = lazy(() => import('@/pages/Sitemap'));

// Lazy-loaded shop product pages
const WuerfelPage = lazy(() => import('@/pages/shop/Wuerfel'));
const StickerPage = lazy(() => import('@/pages/shop/Sticker'));

// Shop-specific pages
const ShopPartnereventPage = lazy(() => import('@/pages/shop/Partnerevent'));
const ShopTycoonRacersPage = lazy(() => import('@/pages/shop/TycoonRacers'));
const PartnerPage = lazy(() => import('@/pages/shop/Partnerevent'));
const TycoonRacersPage = lazy(() => import('@/pages/shop/TycoonRacers'));

// Lazy-loaded checkout pages
const WuerfelCheckoutPage = lazy(() => import('@/pages/checkout/Wuerfel'));
const StickerCheckoutPage = lazy(() => import('@/pages/checkout/Sticker'));
const PartnereventCheckoutPage = lazy(() => import('@/pages/checkout/Partnerevent'));
const TycoonRacersCheckoutPage = lazy(() => import('@/pages/checkout/TycoonRacers'));
const EventwaehrungCheckoutPage = lazy(() => import('@/pages/checkout/Eventwaehrung'));
const FlaggenCheckoutPage = lazy(() => import('@/pages/checkout/Flaggen'));

// Lazy-loaded shop pages
const UebersichtPage = lazy(() => import('@/pages/shop/Uebersicht'));

// Lazy-loaded Hilfe pages
const HilfeUebersichtPage = lazy(() => import('@/pages/hilfe/Uebersicht'));

// Lazy-loaded help pages
const WuerfelHilfePage = lazy(() => import('@/pages/hilfe/wuerfel'));
const PartnerHilfePage = lazy(() => import('@/pages/hilfe/partner'));
const RaceHilfePage = lazy(() => import('@/pages/hilfe/race'));
const StickerHilfePage = lazy(() => import('@/pages/hilfe/sticker'));
const LoginHilfePage = lazy(() => import('@/pages/hilfe/login'));
const AccountsHilfePage = lazy(() => import('@/pages/hilfe/accounts'));
const AuthTokenHilfePage = lazy(() => import('@/pages/hilfe/authtoken'));
const AuthTokenToolPage = lazy(() => import('@/pages/tools/authtoken'));

// News pages
const MaiPreisePage = lazy(() => import('@/pages/news/mai_preise'));

// Tools pages
const AuthtokenToolPage = lazy(() => import('@/pages/tools/Authtoken'));

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
          <Route path="/news" component={News} />
          <Route path="/shop" component={Shop} />
          <Route path="/preise">
             {() => <Redirect to="/shop/uebersicht" />}
          </Route>

          {/* Rechtliche Seiten */}
          <Route path="/kontakt" component={Kontakt} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/datenschutz" component={Datenschutz} />
          <Route path="/agb" component={AGB} />
          <Route path="/widerruf" component={Widerruf} />

          {/* Hilfebereich */}
          <Route path="/hilfe">
            {() => <HilfeUebersichtPage />}
          </Route>
          <Route path="/hilfe/wuerfel">
            {() => <WuerfelHilfePage />}
          </Route>
          <Route path="/hilfe/partner">
            {() => <PartnerHilfePage />}
          </Route>
          <Route path="/hilfe/race">
            {() => <RaceHilfePage />}
          </Route>
          <Route path="/hilfe/sticker">
            {() => <StickerHilfePage />}
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
          <Route path="/tools/authtoken">
            {() => <AuthTokenToolPage />}
          </Route>
          {/* News-Unterseiten */}
          <Route path="/news/mai_preise">
            {() => <MaiPreisePage />}
          </Route>

          {/* Shop-Seiten (alte Pfade direkt überschrieben) */}
          <Route path="/produkte/wuerfel">
            {() => <WuerfelPage />}
          </Route>
          <Route path="/produkte/sticker">
            {() => <StickerPage />}
          </Route>
          <Route path="/produkte/partner">
            {() => <ShopPartnereventPage />}
          </Route>
          <Route path="/produkte/race">
            {() => <ShopTycoonRacersPage />}
          </Route>
          <Route path="/produkte/tycoonracers">
            {() => <ShopTycoonRacersPage />}
          </Route>

          {/* Shop-Unterseiten */}
          <Route path="/shop/uebersicht">
            {() => <UebersichtPage />}
          </Route>
          <Route path="/shop/preise">
             {() => <Redirect to="/shop/uebersicht" />}
          </Route>
          <Route path="/shop/wuerfel">
            {() => <WuerfelPage />}
          </Route>
          <Route path="/shop/sticker">
            {() => <StickerPage />}
          </Route>
          <Route path="/shop/partnerevent">
            {() => <ShopPartnereventPage />}
          </Route>
          <Route path="/shop/tycoonracers">
            {() => <ShopTycoonRacersPage />}
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
          <Route path="/checkout/eventwaehrung">
            {() => <EventwaehrungCheckoutPage />}
          </Route>
          <Route path="/checkout/tycoonracers">
            {() => <TycoonRacersCheckoutPage />}
          </Route>
          <Route path="/checkout/flaggen">
            {() => <FlaggenCheckoutPage />}
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
            {() => <TicketDetailPage />}
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

          {/* Tools-Seiten */}
          <Route path="/tools/authtoken">
            {() => <AuthtokenToolPage />}
          </Route>
          
          {/* Sitemap */}
          <Route path="/sitemap">
            {() => <SitemapPage />}
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
          <ScrollToTop />
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;