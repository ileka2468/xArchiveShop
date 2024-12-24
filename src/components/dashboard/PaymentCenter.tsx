import { useEffect, useState } from "react";
import { useAxios } from "../../Security/axios/AxiosProvider";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

interface PaymentCenterResponse {
  payments: Payment[];
}

export type PlanInfo = {
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
  purchaseDate: string;
  license?: LicenseInfo;
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
        setPayments(response.data.payments.reverse());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const getBillingCycleDisplay = (billingCycle: "MONTHLY" | "ONE_TIME") => {
    switch (billingCycle) {
      case "MONTHLY":
        return "Monthly";
      case "ONE_TIME":
        return "One time";
      default:
        return billingCycle;
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <h1 className="text-3xl font-bold mb-6">Payment Center</h1>
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Purchased Licenses</h2>
        {payments?.filter(
          (payment) => payment.license?.licenseType?.billingCycle === "ONE_TIME"
        ).length ? (
          <div className="space-y-4">
            {payments
              .filter(
                (payment) =>
                  payment.license?.licenseType?.billingCycle === "ONE_TIME"
              )
              .map((payment) => (
                <div
                  key={payment.license?.id ?? payment.purchaseDate}
                  className="p-4 bg-zinc-800 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    {payment.license ? (
                      <>
                        <h3 className="text-lg font-semibold text-white">
                          {payment.license.licenseType?.name.trim()}
                        </h3>
                        <p className="text-gray-400">
                          {getBillingCycleDisplay(
                            payment.license.licenseType?.billingCycle
                          )}{" "}
                          payment
                        </p>
                      </>
                    ) : (
                      <p className="text-yellow-400">Still Processing</p>
                    )}
                    <p className="text-gray-400">
                      Purchased on:{" "}
                      {new Date(payment.purchaseDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400">Price: ${payment.price}</p>
                  </div>
                  {payment.license ? (
                    <Link
                      to={`/license-center/${payment.license.id}`}
                      className="px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold"
                    >
                      View License
                    </Link>
                  ) : null}
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-400 mb-4">You have no one-time licenses.</p>
        )}
        <h2 className="text-xl font-semibold mb-4 mt-8">Subscription Info</h2>
        {payments?.filter(
          (payment) => payment.license?.licenseType?.billingCycle === "MONTHLY"
        ).length ? (
          <div className="space-y-4">
            {payments
              .filter(
                (payment) =>
                  payment.license?.licenseType?.billingCycle === "MONTHLY"
              )
              .map((payment) => (
                <div
                  key={payment.license?.id ?? payment.purchaseDate}
                  className="p-4 bg-zinc-800 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    {payment.license ? (
                      <>
                        <h3 className="text-lg font-semibold text-white">
                          {payment.license.licenseType?.name.trim()}
                        </h3>
                        <p className="text-gray-400">
                          {getBillingCycleDisplay(
                            payment.license.licenseType?.billingCycle
                          )}{" "}
                          payment
                        </p>
                      </>
                    ) : (
                      <p className="text-yellow-400">Still Processing</p>
                    )}
                    <p className="text-gray-400">
                      Purchased on:{" "}
                      {new Date(payment.purchaseDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400">Price: ${payment.price}</p>
                  </div>
                  {payment.license ? (
                    <Link
                      to={`/license-center/${payment.license.id}`}
                      className="px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold"
                    >
                      View License
                    </Link>
                  ) : null}
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-400 mb-4">No active subscriptions.</p>
        )}
        <a
          href="https://billing.stripe.com/p/login_link"
          className="inline-block px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold mt-4"
        >
          Manage Subscriptions
        </a>
      </div>
    </div>
  );
}
