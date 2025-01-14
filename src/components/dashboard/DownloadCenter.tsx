import { useAxios } from "../../Security/axios/AxiosProvider";

export function DownloadCenter() {
  const apiClient = useAxios();

  const handleDownload = async (os: string) => {
    try {
      const response = await apiClient.post("/download/generate-signed-url", {
        fileName: `xarchive-${os}.zip`,
      });
      const fileUrl = response.data;

      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = `xarchive-${os}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Download Center</h1>
      <p className="text-gray-400 mb-4">
        Download xArchive for your operating system.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => handleDownload("windows")}
          className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded"
        >
          Download for Windows
        </button>
        <button
          onClick={() => handleDownload("osx")}
          className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded"
        >
          Download for MacOS
        </button>
      </div>
    </div>
  );
}
