import { useState } from "react";
import { useAxios } from "../../Security/axios/AxiosProvider";
import { useUserContext } from "../../Security/user/UserContext";

interface AccontEditModalProps {
  form: formType;
  onClose: () => void;
}
type stateKey =
  | "email"
  | "mfaCode"
  | "currentPassword"
  | "newPassword"
  | "confirmNewPassword"
  | "firstName"
  | "lastName";

interface formUI {
  title: string;
  formType: formType;
  inputs: {
    label: string;
    type: string;
    placeholder: string;
    stateKey: stateKey;
  }[];
  conditionalInputs?: conditionalInput[];
  onsubmit: () => void;
}

type formType = "changeEmail" | "changeName" | "resetPassword";

type mfaState = "pending" | "sent" | "error" | null;

const AccontEditModal = ({ form, onClose }: AccontEditModalProps) => {
  const axios = useAxios();
  const { userData } = useUserContext();
  // Form submission handlers
  const handleChangeEmail = async () => {
    try {
      setFormError("");
      const response = await axios.post("/auth/changeEmail", { email });
      if (response.status === 200) {
        if (response.data) {
          setFormResponse(response.data);
        }
        setMfaState("sent");
      }
    } catch (error: any) {
      setFormError(error.response?.data?.message || "Failed to change email.");
    }
  };

  const handleResetPassword = async () => {
    try {
      setFormError("");
      // Check if new password and confirm new password match before sending request
      if (newPassword !== confirmNewPassword) {
        setFormError("Passwords do not match.");
        return;
      }

      const response = await axios.post("/auth/resetPassword", {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      if (response.status === 200) {
        if (response.data) {
          setFormResponse(response.data);
        }
        setMfaState("sent");
      }
    } catch (error: any) {
      setFormError(error.response?.data || "Failed to reset password.");
    }
  };

  const handleChangeName = async () => {
    try {
      setFormError("");
      const response = await axios.post("/auth/changeName", {
        firstName,
        lastName,
      });

      if (response.status === 200) {
        onClose();
      } else {
        console.log(response);
      }
    } catch (error: any) {
      setFormError(error.response?.data || "Failed to change name.");
    }
  };

  const handleVerifyMfa = async () => {
    try {
      setFormError("");
      const response = await axios.post("/auth/verifyMfa", { mfaCode });
      if (response.status === 200) {
        onClose();
        setMfaState(null);
      }
    } catch (error: any) {
      setFormError(error.response?.data || "Invalid MFA code.");
    }
  };

  // Global form error state and global form response state
  const [formError, setFormError] = useState("");
  const [formResponse, setFormResponse] = useState("");

  const [mfaState, setMfaState] = useState<mfaState>(null);

  // Change email state
  const [email, setEmail] = useState("");
  const [mfaCode, setMfaCode] = useState("");

  // Change password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Change name state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const formData: Array<formUI> = [
    {
      title: "Change Email",
      formType: "changeEmail",
      inputs: [
        {
          label: "Email",
          type: "email",
          placeholder: userData.username,
          stateKey: "email",
        },
      ],
      onsubmit: handleChangeEmail,
    },
    {
      title: "Change Name",
      formType: "changeName",
      inputs: [
        {
          label: "First Name",
          type: "text",
          placeholder: userData.firstname,
          stateKey: "firstName",
        },
        {
          label: "Last Name",
          type: "text",
          placeholder: userData.lastname,
          stateKey: "lastName",
        },
      ],
      onsubmit: handleChangeName,
    },
    {
      title: "Reset Password",
      formType: "resetPassword",
      inputs: [
        {
          label: "Current Password",
          type: "password",
          placeholder: "Current Password",
          stateKey: "currentPassword",
        },
        {
          label: "New Password",
          type: "password",
          placeholder: "New Password",
          stateKey: "newPassword",
        },
        {
          label: "Confirm New Password",
          type: "password",
          placeholder: "Confirm New Password",
          stateKey: "confirmNewPassword",
        },
      ],
      onsubmit: handleResetPassword,
    },
  ];

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateKey: stateKey
  ) => {
    const { value } = e.target;
    switch (stateKey) {
      case "email":
        setEmail(value);
        break;
      case "mfaCode":
        setMfaCode(value);
        break;
      case "currentPassword":
        setCurrentPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmNewPassword":
        setConfirmNewPassword(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  const currentForm = formData.find((data) => data.formType === form);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-full sm:max-w-xl">
        <div className="relative bg-zinc-900 p-4 sm:p-8 rounded-lg shadow-lg w-full overflow-hidden">
          <span className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none animate-pulse-border"></span>

          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            {currentForm?.title}
          </h2>

          {formError && (
            <div className="mb-4 text-red-500 text-sm sm:text-base">
              {formError}
            </div>
          )}

          {formResponse && (
            <div className="mb-4 text-green-500 text-sm sm:text-base">
              {formResponse}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (mfaState === "sent") {
                handleVerifyMfa();
              } else {
                currentForm?.onsubmit();
              }
            }}
          >
            {currentForm?.inputs.map((input, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-300 mb-1 sm:mb-2">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  value={
                    input.stateKey === "email"
                      ? email
                      : input.stateKey === "mfaCode"
                      ? mfaCode
                      : input.stateKey === "currentPassword"
                      ? currentPassword
                      : input.stateKey === "newPassword"
                      ? newPassword
                      : input.stateKey === "confirmNewPassword"
                      ? confirmNewPassword
                      : input.stateKey === "firstName"
                      ? firstName
                      : input.stateKey === "lastName"
                      ? lastName
                      : ""
                  }
                  onChange={(e) => handleInputChange(e, input.stateKey)}
                  className="w-full p-2 bg-zinc-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            ))}

            {/* Conditionally render MFA code input */}
            {mfaState === "sent" && (
              <div className="mb-4">
                <label className="block text-gray-300 mb-1 sm:mb-2">
                  MFA Code
                </label>
                <input
                  type="text"
                  placeholder="Enter MFA Code"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  className="w-full p-2 bg-zinc-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 sm:py-3 rounded bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:from-pink-600 hover:to-purple-500 transition"
            >
              {mfaState === "sent" ? "Verify Pin" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccontEditModal;
