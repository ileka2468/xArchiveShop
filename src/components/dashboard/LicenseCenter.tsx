import { useState, useEffect } from "react";
import { useAxios } from "../../Security/axios/AxiosProvider";
import Spinner from "../Spinner";
import { PlanInfo } from "./PaymentCenter";

interface LicenseCenterResponse {
  licenses: License[];
}

interface License {
  id: number;
  licenseNumber: string;
  licenseType: PlanInfo;
}

export function LicenseCenter() {
  const apiClient = useAxios();
  const [loading, setLoading] = useState(true);
  const [licenses, setLicenses] = useState<License[] | null>([]);
  const [copiedLicenseId, setCopiedLicenseId] = useState<number | null>(null);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const response = await apiClient.get<LicenseCenterResponse>(
          "/licensing/license"
        );
        console.log(response.data.licenses);
        setLicenses(response.data.licenses);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLicenses();
  }, []);

  const handleCopy = (licenseNumber: string, licenseId: number) => {
    navigator.clipboard.writeText(licenseNumber).then(() => {
      setCopiedLicenseId(licenseId);
      setTimeout(() => setCopiedLicenseId(null), 2000);
    });
  };

  if (loading) {
    return <Spinner />;
  }

  if (licenses === null || licenses.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-8">
        <p>No licenses available.</p>
      </div>
    );
  }

  return (
    <div>
      {licenses.map((license) => (
        <div
          key={license.id}
          className="bg-zinc-900 p-6 rounded-lg shadow-lg mb-4"
        >
          <h2 className="text-xl font-semibold mb-4">
            {license.licenseType.name}
          </h2>
          <p className="text-gray-400">
            License Number:{" "}
            <span className="text-white">{license.licenseNumber}</span>
            <button
              onClick={() => handleCopy(license.licenseNumber, license.id)}
              className="ml-2 px-2 py-1 rounded bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold"
            >
              <p className="text-sm font-normal">
                {copiedLicenseId === license.id ? "Copied!" : "Copy"}
              </p>
            </button>
          </p>
          <p className="text-gray-400">
            License Type:{" "}
            <span className="text-white">{license.licenseType.name}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
