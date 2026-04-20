import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// import AdminDashboard from "./pages/admin/AdminDashboard";




import Footer from "./pages/Footer/foot";

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import ScrollToTop from "./utils/top";

import MainHeader from "./pages/Header/MainHeader";

import BrokerDetail from "@/pages/BrokerDetail";
import CreateBroker from "@/pages/CreateBroker";
function Router() {
  return (
    <Switch>
    
     
      <Route path="/" component={Home} />
      <Route path="/broker/:slug" component={BrokerDetail} />
      <Route path="/create-broker" component={CreateBroker} />
      {/* <Route path="/register" component={RegisterPage} /> */}


    </Switch>
  );
}


function App() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);


  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />

          <div className="flex flex-col min-h-screen">
           
              <MainHeader  />
              <main className="flex-grow">
                <Router />
              </main>

              <ScrollToTop />
              <Footer />
           
          </div>

        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>

  );
}

export default App;
