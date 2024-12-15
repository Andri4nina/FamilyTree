import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";

import { AuthStatus } from "./useAuth";
import userService from "../service/UserService";


export const useAuthCheck = () => {
  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState(AuthStatus.Unknown);

  const checkAuth = useCallback(async () => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Assurez-vous que getUserById retourne une promesse
        const MyUser = await userService.getUserById(decodedToken.user.id);

        setUserData(MyUser.data);
        setStatus(AuthStatus.Authenticated);
      } catch (error) {
        console.error("Invalid token", error);
        setUserData(null);
        setStatus(AuthStatus.Guest);
      }
    } else {
      setUserData(null);
      setStatus(AuthStatus.Guest);
    }
  }, []);

  useEffect(
    () => {
      checkAuth(); // Initial check

      // Listen for changes to the authentication state
      window.addEventListener("authChange", checkAuth);

      return () => {
        window.removeEventListener("authChange", checkAuth);
      };
    },
    [checkAuth]
  );

  return { userData, status };
};
