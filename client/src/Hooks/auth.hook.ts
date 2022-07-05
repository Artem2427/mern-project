import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState<null | string>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [userId, setUserId] = useState<null | string>(null);

  const login = useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = localStorage.getItem(storageName);

    if (data) {
      const obj = JSON.parse(data);
      login(obj.token, obj.userId);
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
