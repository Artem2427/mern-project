import { useState, useCallback } from "react";
import { Methods } from "../Utils/enums";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url: string, method: Methods, body = null, headers = {}) => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        return data;
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearError = () => setError(null);

  return { loading, request, clearError, error };
};
