import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import LandingPage from "@/pages/LandingPage";
import StartPage from "@/pages/StartPage";
import BlogPost from "@/pages/BlogPost";

function Router() {
  return (
    <Switch>
      <Route path="/" component={StartPage} />
      <Route path="/landing" component={LandingPage} />
      <Route path="/preise" component={Home} />
      <Route path="/blog" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
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
