export function LicenseCenter() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">License Center</h1>
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Your License</h2>
        <p className="text-gray-400">
          License Number:{" "}
          <span className="text-white">XXXX-XXXX-XXXX-XXXX</span>
        </p>
        <p className="text-gray-400">
          License Type: <span className="text-white">Pro</span>
        </p>
      </div>
    </div>
  );
}
