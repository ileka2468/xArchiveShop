import { useState } from "react";
import AccontEditModal from "./AccontEditModal";

export function AccountCenter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState("changeEmail" as formType);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-6">Account Center</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => {
              setForm("changeEmail");
              setIsModalOpen(!isModalOpen);
            }}
            className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded"
          >
            Change Email
          </button>
          <button
            onClick={() => {
              setForm("resetPassword");
              setIsModalOpen(!isModalOpen);
            }}
            className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded"
          >
            Reset Password
          </button>
          <button
            onClick={() => {
              setForm("changeName");
              setIsModalOpen(!isModalOpen);
            }}
            className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded"
          >
            Change Name
          </button>
        </div>
      </div>
      {isModalOpen && (
        <AccontEditModal form={form} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
