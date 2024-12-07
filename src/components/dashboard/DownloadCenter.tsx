export function DownloadCenter() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Download Center</h1>
      <p className="text-gray-400 mb-4">
        Download the application appropriate for your license.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded">
          Download Pro Version
        </button>
        <button className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded">
          Download Basic Version
        </button>
      </div>
    </div>
  );
}
