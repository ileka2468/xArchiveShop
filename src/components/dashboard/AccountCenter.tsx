export function AccountCenter() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Account Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded">
          Manage Account
        </button>
        <button className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded">
          Change Email
        </button>
        <button className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded">
          Reset Password
        </button>
        <button className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded">
          Change Name
        </button>
      </div>
    </div>
  );
}
