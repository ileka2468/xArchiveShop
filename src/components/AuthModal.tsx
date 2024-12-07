import React, { useState } from "react";
import { useAxios } from "../Security/axios/AxiosProvider";
import { useUserContext } from "../Security/user/UserContext";

interface AuthModalProps {
  onClose: () => void;
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

    try {
      const response = await apiClient.post("/auth/register", {
        username: email,
        password,
        name,
      });

      if (response.status === 200) {
        const token = response.headers["authorization"];
        if (token) {
          const tokenPart = token.split(" ")[1];
          localStorage.setItem("accessToken", tokenPart);
          setUserData(response.data);
          onClose();
        }
      }
    } catch (error) {
      alert("An error occurred: " + error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/auth/login", {
        username: email,
        password,
      });

      if (response.status === 200) {
        const token = response.headers["authorization"];
        if (token) {
          const tokenPart = token.split(" ")[1];
          localStorage.setItem("accessToken", tokenPart);
          setUserData(response.data);
          onClose();
        }
      }
    } catch (error) {
      alert("An error occurred: " + error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative">
        <div className="relative bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-lg overflow-hidden">
          <span className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none animate-pulse-border"></span>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold text-white mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={isLogin ? handleLogin : handleRegister}>
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
              <p className="text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-purple-500 hover:underline"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
