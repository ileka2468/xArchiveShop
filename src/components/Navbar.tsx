import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Archive } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { useUserContext } from "../Security/user/UserContext";
import { useAxios } from "../Security/axios/AxiosProvider";

export function Navbar() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { setUserData, isUser } = useUserContext();
  const apiClient = useAxios();
  const { pathname, hash } = useLocation();

  const isLandingPage = pathname === "/";

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <>
      <nav className="bg-black/95 border-b border-zinc-800 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {isLandingPage ? (
                <a href="#" className="ml-2 text-xl font-bold text-white">
                  <span className="flex justify-evenly items-center">
                    <Archive className="w-8 h-8 text-purple-500 m-1" />
                    xArchive
                  </span>
                </a>
              ) : (
                <Link to="/" className="ml-2 text-xl font-bold text-white">
                  <span className="flex justify-evenly items-center">
                    <Archive className="w-8 h-8 text-purple-500 m-1" />
                    xArchive
                  </span>
                </Link>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {!isLandingPage ? (
                <Link
                  to="/#features"
                  className="text-gray-300 hover:text-purple-500 transition"
                >
                  Features
                </Link>
              ) : (
                <a
                  href="#features"
                  className="text-gray-300 hover:text-purple-500 transition"
                >
                  Features
                </a>
              )}

              {!isLandingPage ? (
                <Link
                  to="/#pricing"
                  className="text-gray-300 hover:text-purple-500 transition"
                >
                  Pricing
                </Link>
              ) : (
                <a
                  href="#pricing"
                  className="text-gray-300 hover:text-purple-500 transition"
                >
                  Pricing
                </a>
              )}
              {isUser && (
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-purple-500 transition"
                >
                  Dashboard
                </Link>
              )}
              {!isUser && (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 transition"
                >
                  Login
                </button>
              )}
              {isUser && (
                <button
                  onClick={async () => {
                    const response = await apiClient.post("/auth/logout");
                    if (response.status === 200) {
                      localStorage.removeItem("accessToken");
                      setUserData({} as any);
                    }
                  }}
                  className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 transition"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {isAuthModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
    </>
  );
}
