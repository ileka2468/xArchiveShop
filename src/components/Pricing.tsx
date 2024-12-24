import { PricingCard } from "./PricingCard";
import { useAxios } from "../Security/axios/AxiosProvider";

export function Pricing() {
  const apiClient = useAxios();

  const onPurchaseClick = async (priceId: string) => {
    alert(
      "Purchases are currently disabled as we continue development. Please check back later."
    );
    return; // TEMP DISABLE PURCHASES
    try {
      const response = await apiClient.post(
        "/billing/create-checkout-session",
        {
          priceId,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error("An error occurred: " + error.response);
    }
  };
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
              price="$45"
              features={[
                "One-time payment",
                "Lifetime access to xArchive",
                "All current and future features included",
                "Priority email support",
                "Free updates throughout application life",
              ]}
              highlight="Best Value"
              priceId="price_1QTxNYGYxMWOnGCC5PfAcJg6"
              onPurchaseClick={onPurchaseClick}
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
              "Backup an unlimited number of X accounts simultaneously",
              "Realtime sync",
              "Daily account snapshots",
              "Priority support",
              "Advanced Automated backup scheduling",
              "Use backup data to restore/transfer your X data to new accounts",
              "Cancel anytime",
            ]}
            popular
            priceId="price_1QTxPfGYxMWOnGCCuG8qBoo3"
            onPurchaseClick={onPurchaseClick}
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
            priceId="price_1QTxROGYxMWOnGCCdBslRmIO"
            onPurchaseClick={onPurchaseClick}
          />
        </div>
      </div>
    </section>
  );
}
