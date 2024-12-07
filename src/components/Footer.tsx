import { Link } from "react-router-dom";
import { Archive } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black/95 border-t border-zinc-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Archive className="w-6 h-6 text-purple-500 m-1" />
            <span className="text-lg font-bold text-white">xArchive</span>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/privacy"
              className="text-gray-300 hover:text-purple-500 transition"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-300 hover:text-purple-500 transition"
            >
              Terms of Service
            </Link>
            <Link
              to="/disclaimers"
              className="text-gray-300 hover:text-purple-500 transition"
            >
              Disclaimers
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
