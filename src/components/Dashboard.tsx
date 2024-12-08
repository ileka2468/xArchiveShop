import { Link, Routes, Route } from "react-router-dom";
import { AccountCenter } from "./dashboard/AccountCenter";
import { PaymentCenter } from "./dashboard/PaymentCenter";
import { DownloadCenter } from "./dashboard/DownloadCenter";
import { LicenseCenter } from "./dashboard/LicenseCenter";
import { DashboardHome } from "./dashboard/DashboardHome";

export function Dashboard() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 p-6 fixed inset-y-0 top-16">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="block px-4 py-2 rounded hover:bg-zinc-800"
          >
            Overview
          </Link>
          <Link
            to="/dashboard/account"
            className="block px-4 py-2 rounded hover:bg-zinc-800"
          >
            Manage Account
          </Link>
          <Link
            to="/dashboard/payments"
            className="block px-4 py-2 rounded hover:bg-zinc-800"
          >
            Payment Center
          </Link>
          <Link
            to="/dashboard/downloads"
            className="block px-4 py-2 rounded hover:bg-zinc-800"
          >
            Downloads
          </Link>
          <Link
            to="/dashboard/licenses"
            className="block px-4 py-2 rounded hover:bg-zinc-800"
          >
            Licenses
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="ml-64 p-8 pt-20 flex-1">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="account" element={<AccountCenter />} />
          <Route path="payments" element={<PaymentCenter />} />
          <Route path="downloads" element={<DownloadCenter />} />
          <Route path="licenses" element={<LicenseCenter />} />
        </Routes>
      </main>
    </div>
  );
}
