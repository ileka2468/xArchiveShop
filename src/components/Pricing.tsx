import React from "react";
import { PricingCard } from "./PricingCard";

export function Pricing() {
  return (
    <section id="pricing" className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Choose Your Plan</h2>
          <p className="mt-4 text-gray-400">
            Select the perfect plan for your archiving needs
          </p>
        </div>

        {/* Lifetime License */}
        <div className="mt-16">
          <div className="max-w-lg mx-auto">
            <PricingCard
              title="Lifetime License"
              price="$99"
              features={[
                "One-time payment",
                "Lifetime access to xArchive",
                "All current and future features included",
                "Priority email support",
                "Free updates throughout application life",
              ]}
              highlight="Best Value"
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white">
            Monthly Subscription Plans
          </h3>
          <p className="mt-4 text-gray-400">
            Prefer flexibility? Choose a monthly plan
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          <PricingCard
            title="Pro"
            price="$12.99"
            period="month"
            features={[
              "Backup an unlimited number of X accounts",
              "Realtime sync",
              "Daily account snapshots",
              "Priority support",
              "Advanced Automated backup scheduling",
              "Use backup data to restore/transfer your X data to new accounts",
              "Cancel anytime",
            ]}
            popular
          />

          <PricingCard
            title="Basic"
            price="$6.99"
            period="month"
            features={[
              "Backup up to 2 X accounts",
              "Hourly sync",
              "Bi-weekly account snapshots",
              "Basic support",
              "Automated backup scheduling",
              "Cancel anytime",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
