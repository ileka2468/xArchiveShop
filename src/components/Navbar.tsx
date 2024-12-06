import React, { useState } from "react";
import { Archive } from "lucide-react";
import { AuthModal } from "./AuthModal";

export function Navbar() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-black/95 border-b border-zinc-800 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Archive className="w-8 h-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold text-white">
                xArchive
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#features"
                className="text-gray-300 hover:text-purple-500 transition"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-purple-500 transition"
              >
                Pricing
              </a>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 transition"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isAuthModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
    </>
  );
}
