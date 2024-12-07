import { Shield, Database, Clock } from "lucide-react";
import { HeroAnimation } from "./HeroAnimation";

export function Hero() {
  return (
    <div id="" className="relative bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Your X Archive, Secured Forever
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Comprehensive backup solution for your entire X/Twitter account
          </p>
          <div className="mt-8 flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-purple-500" />
              <p className="mt-2 text-sm text-gray-400">Secure Backup</p>
            </div>
            <div className="flex flex-col items-center">
              <Database className="w-8 h-8 text-purple-500" />
              <p className="mt-2 text-sm text-gray-400">Complete Archive</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-purple-500" />
              <p className="mt-2 text-sm text-gray-400">Automated Sync</p>
            </div>
          </div>
          <div className="mt-8">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </div>
  );
}
