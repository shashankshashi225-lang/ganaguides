import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Home from "@/pages/Home";
import PackagesLanding from "@/pages/PackagesLanding";
import PackageCategory from "@/pages/PackageCategory";
import Destinations from "@/pages/Destinations";
import Blog from "@/pages/Blog";
import About from "@/pages/About";
import Booking from "@/pages/Booking";
import PackageDetail from "@/pages/PackageDetail";
import DestinationDetail from "@/pages/DestinationDetail";
import BlogDetail from "@/pages/BlogDetail";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/packages" component={PackagesLanding} />
        <Route path="/packages/:category" component={PackageCategory} />
        <Route path="/destinations" component={Destinations} />
        <Route path="/blog" component={Blog} />
        <Route path="/about" component={About} />
        <Route path="/booking" component={Booking} />
        <Route path="/package/:id" component={PackageDetail} />
        <Route path="/destination/:id" component={DestinationDetail} />
        <Route path="/blog/:id" component={BlogDetail} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <WhatsAppWidget />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
