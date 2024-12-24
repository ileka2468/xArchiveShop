import { Check } from "lucide-react";
import { useUserContext } from "../Security/user/UserContext";

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  features: string[];
  popular?: boolean;
  highlight?: string;
  priceId: string;
  onPurchaseClick: (priceId: string) => void;
}

export function PricingCard({
  title,
  price,
  period,
  features,
  popular,
  highlight,
  priceId,
  onPurchaseClick,
}: PricingCardProps) {
  const { isUser } = useUserContext();

  return (
    <div
      className={`relative rounded-2xl flex flex-col ${
        popular
          ? "bg-gradient-to-b from-purple-900 to-black border-2 border-purple-500"
          : "bg-zinc-900"
      } p-8 shadow-xl`}
    >
      {(popular || highlight) && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
          {popular ? "Most Popular" : highlight}
        </span>
      )}
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold text-white">{price}</span>
          {period && <span className="text-gray-400">/{period}</span>}
        </div>
        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-300">
              <Check className="w-5 h-5 text-purple-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <button
        className={`mt-8 w-full py-3 px-6 rounded-lg font-medium transition
        ${
          popular || highlight
            ? "bg-purple-500 hover:bg-purple-600 text-white"
            : "bg-zinc-800 hover:bg-zinc-700 text-gray-300"
        }`}
        onClick={() => {
          if (!isUser) {
            return; // TODO later add logic to redirect to login or signup
          }
          onPurchaseClick(priceId);
        }}
      >
        {!isUser
          ? "Get Started"
          : period
          ? `Purchase ${title} Subscription`
          : "Purchase " + title}
      </button>
    </div>
  );
}
