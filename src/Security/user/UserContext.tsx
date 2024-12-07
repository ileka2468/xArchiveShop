import React, { createContext, useContext, useState, useEffect } from "react";
import { useAxios } from "../axios/AxiosProvider";

interface UserData {
  username: string;
  firstname: string;
  lastname: string;
}

interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  isUser: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const apiClient = useAxios();
  const [userData, setUserData] = useState<UserData>({
    username: "",
    firstname: "",
    lastname: "",
  });
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("accessToken") != null) {
        const response = await apiClient.get("/auth/user");
        if (response.status === 200) {
          setUserData(response.data);
        }
      }
    };
    fetchUser();
  }, [apiClient]);

  useEffect(() => {
    setIsUser(!!userData.username);
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData, isUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
