import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Pricing } from "./components/Pricing";
import { AxiosProvider } from "./Security/axios/AxiosProvider";
import { UserProvider } from "./Security/user/UserContext";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <UserProvider>
        <AxiosProvider>
          <Navbar />
          <Hero />
          <Features />
          <Pricing />
        </AxiosProvider>
      </UserProvider>
    </div>
  );
}

export default App;
