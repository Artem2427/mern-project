import { useState, useCallback, useEffect } from "react";
import authServices from "../Services/authService";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState<null | string>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [userId, setUserId] = useState<null | string>(null);

  const login = useCallback((jwtToken: string | null, id: string) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const accessToken = await authServices.getAccessToken();
      if (accessToken) {
        return accessToken.token;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem(storageName);

    if (data && !token) {
      checkAuth()
        .then((token) => {
          const obj = JSON.parse(data);
          login(token, obj.userId);
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem(storageName);
        });
    }

    setReady(true);
  }, [login, checkAuth, token]);

  return { login, logout, token, userId, ready };
};
