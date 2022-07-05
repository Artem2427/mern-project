import { createContext } from "react";

function noop() {}

const initialState: AuthenticationContext = {
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
};

export const AuthContext = createContext(initialState);
