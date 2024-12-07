import React, { useState } from "react";
import { useAxios } from "../Security/axios/AxiosProvider";
import { useUserContext } from "../Security/user/UserContext";

interface AuthModalProps {
  onClose: () => void;
}

interface RegisterRequest {
  username: string;
  password: string;
  name: string;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const apiClient = useAxios();
  const { setUserData } = useUserContext();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const registerRequest: RegisterRequest = {
      username: email,
      password,
      name,
    };

    try {
      const response = await apiClient.post("/auth/register", registerRequest);

      if (response.status === 200) {
        onClose();
      }
      const token = response.headers["authorization"];
      if (token) {
        console.log("Set New Acess Token:" + response.headers);
        const tokenPart = token.split(" ")[1];
        localStorage.setItem("accessToken", tokenPart);
        setUserData(response.data);
        return true;
      }
    } catch (error) {
      alert("An error occurred: " + error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 bg-zinc-800 rounded text-white"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 bg-zinc-800 rounded text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 bg-zinc-800 rounded text-white"
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mb-4 bg-zinc-800 rounded text-white"
            />
          )}
          <button
            type="submit"
            onClick={isLogin ? undefined : handleRegister}
            className="w-full py-2 rounded bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          {isLogin ? (
            <p className="text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-purple-500 hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <>
              <p className="text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-purple-500 hover:underline"
                >
                  Login
                </button>
              </p>
              <p className="text-gray-400 mt-2 text-sm">
                Forgot password?{" "}
                <button className="text-purple-500 hover:underline">
                  Reset it
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
