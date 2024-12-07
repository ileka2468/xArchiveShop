// useUser.ts
import { useEffect, useState } from "react";
import { useAxios } from "../axios/AxiosProvider";

export interface UserData {
  username: string;
  firstname: string;
  lastname: string;
}

const useUser = (): [
  userData: UserData,
  setUserData: React.Dispatch<React.SetStateAction<UserData>>,
  isUser: boolean
] => {
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

  return [userData, setUserData, isUser];
};

export default useUser;
