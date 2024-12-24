import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Pricing } from "./components/Pricing";
import { AxiosProvider } from "./Security/axios/AxiosProvider";
import { UserProvider } from "./Security/user/UserContext";
import { Dashboard } from "./components/Dashboard";
import { PrivateRoute } from "./components/PrivateRoute";
import { Footer } from "./components/Footer";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";
import { Disclaimers } from "./components/Disclaimers";

function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col overflow-hidden">
      <UserProvider>
        <AxiosProvider>
          <Router>
            <Navbar />
            <div className="flex-grow pt-16">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Hero />
                      <Features />
                      <Pricing />
                    </>
                  }
                />
                <Route
                  path="/dashboard/*"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/disclaimers" element={<Disclaimers />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </AxiosProvider>
      </UserProvider>
    </div>
  );
}

export default App;
