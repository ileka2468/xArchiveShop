import React from "react";
import {
  Archive,
  Search,
  Download,
  Clock,
  Shield,
  Database,
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Archive className="w-6 h-6 text-purple-500" />,
      title: "Comprehensive Backup",
      description: "Archive tweets, retweets, replies, DMs, and media files",
    },
    {
      icon: <Database className="w-6 h-6 text-purple-500" />,
      title: "Built-in Media Viewer",
      description: "View your archived media files directly in the app",
    },
    {
      icon: <Search className="w-6 h-6 text-purple-500" />,
      title: "Advanced Search",
      description: "Powerful search tools to find specific content quickly",
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-500" />,
      title: "Automated Scheduling",
      description: "Set up automatic backups on your preferred schedule",
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      title: "Secure Storage",
      description:
        "Your data is safely stored on your device, never on the cloud",
    },
    {
      icon: <Database className="w-6 h-6 text-purple-500" />,
      title: "Cross-Platform",
      description: "Works seamlessly across Windows, macOS, and Linux",
    },
  ];

  return (
    <section id="features" className="bg-zinc-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Powerful Features</h2>
          <p className="mt-4 text-gray-400">
            Everything you need to preserve your X/Twitter presence
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-black/50 rounded-xl p-6 border border-zinc-800"
            >
              <div className="flex items-center">
                {feature.icon}
                <h3 className="ml-3 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="mt-4 text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
