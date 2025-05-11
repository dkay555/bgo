import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/layouts/MainLayout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import LandingPage from "@/pages/LandingPage";
import StartPage from "@/pages/StartPage";
import BlogPost from "@/pages/BlogPost";
import Kontakt from "@/pages/Kontakt";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import AGB from "@/pages/AGB";
import Hilfe from "@/pages/Hilfe";
import Produkte from "@/pages/Produkte";

// Lazy loading für Unterseiten, die nicht sofort benötigt werden
import { lazy, Suspense } from "react";

// Lazy-loaded product pages
const WuerfelPage = lazy(() => import('@/pages/produkte/Wuerfel'));
const StickerPage = lazy(() => import('@/pages/produkte/Sticker'));
const PartnerPage = lazy(() => import('@/pages/produkte/Partner'));
const RacePage = lazy(() => import('@/pages/produkte/Race'));
const WeiterePage = lazy(() => import('@/pages/produkte/Weitere'));

// Lazy-loaded help pages
const WuerfelHilfePage = lazy(() => import('@/pages/hilfe/wuerfel'));
const PartnerHilfePage = lazy(() => import('@/pages/hilfe/partner'));
const RaceHilfePage = lazy(() => import('@/pages/hilfe/race'));
const LoginHilfePage = lazy(() => import('@/pages/hilfe/login'));
const AccountsHilfePage = lazy(() => import('@/pages/hilfe/accounts'));

const Ladebildschirm = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00CFFF] mx-auto mb-4"></div>
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
          <Route path="/produkte" component={Produkte} />
          <Route path="/preise" component={Home} />
          
          {/* Rechtliche Seiten */}
          <Route path="/kontakt" component={Kontakt} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/datenschutz" component={Datenschutz} />
          <Route path="/agb" component={AGB} />
          
          {/* Hilfebereich */}
          <Route path="/hilfe" component={Hilfe} />
          <Route path="/hilfe/wuerfel" component={WuerfelHilfePage} />
          <Route path="/hilfe/partner" component={PartnerHilfePage} />
          <Route path="/hilfe/race" component={RaceHilfePage} />
          <Route path="/hilfe/login" component={LoginHilfePage} />
          <Route path="/hilfe/accounts" component={AccountsHilfePage} />
          
          {/* Produkt-Unterseiten */}
          <Route path="/produkte/wuerfel" component={WuerfelPage} />
          <Route path="/produkte/sticker" component={StickerPage} />
          <Route path="/produkte/partner" component={PartnerPage} />
          <Route path="/produkte/race" component={RacePage} />
          <Route path="/produkte/weitere" component={WeiterePage} />
          
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
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
