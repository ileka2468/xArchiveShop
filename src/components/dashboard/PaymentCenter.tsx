import { useEffect, useState } from "react";
import { useAxios } from "../../Security/axios/AxiosProvider";

interface PaymentCenterResponse {
  payments: Payment[];
}

type PlanInfo = {
  id: number;
  name: string;
  billingCycle: "MONTHLY" | "ONE_TIME";
};

type LicenseInfo = {
  id: number;
  licenseType: PlanInfo;
};

interface Payment {
  price: number;
  purchaseDate: string; // Keep as string since that's what the API returns
  license: LicenseInfo;
}

export function PaymentCenter() {
  const apiClient = useAxios();
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[] | null>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await apiClient.get<PaymentCenterResponse>(
          "/billing/payments"
        );
        console.log(response.data);
        console.log(response.data.payments);
        setPayments(response.data.payments);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []); // Empty dependency array

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1 className="text-3xl font-bold mb-6">Payment Center</h1>
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Purchased Licenses</h2>
        {payments?.length ? (
          <ul>
            {payments.map((payment) => (
              <li key={payment.license.id} className="mb-4">
                <h3 className="text-lg font-semibold">
                  {payment.license.licenseType.name.trim()}
                </h3>
                <p className="text-gray-400">
                  {payment.license.licenseType.billingCycle} billing cycle
                </p>
                <p className="text-gray-400">
                  Purchased on:{" "}
                  {new Date(payment.purchaseDate).toLocaleDateString()}
                </p>
                <p className="text-gray-400">Price: ${payment.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 mb-4">You have no licenses.</p>
        )}
        <h2 className="text-xl font-semibold mb-4">Subscription Info</h2>
        <p className="text-gray-400 mb-4">No active subscriptions.</p>
        <a
          href="https://billing.stripe.com/p/login_link"
          className="inline-block px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold"
        >
          Manage Subscription
        </a>
      </div>
    </div>
  );
}
