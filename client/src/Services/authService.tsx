import { api } from "./api";

const authServices: AuthServices = {
  async registrationNewUser(body) {
    const response = await api.post("/auth/register", body);

    return response.data;
  },

  async checkUser(body) {
    const response = await api.post("/auth/login", body);

    return response.data;
  },

  async getAccessToken() {
    const response = await api.get("/auth/access-token");

    return response.data;
  },

  async logout() {
    await api.get("/auth/logout");
  },

  getAccessKey(): string | null {
    const userData = localStorage.getItem("userData");

    if (userData) {
      const token = JSON.parse(userData).token;
      return token as string;
    }

    return null;
  },

  isLoggedIn() {
    const data = localStorage.getItem("userData");

    if (data) {
      const accessToken = JSON.parse(data).token;

      return !!accessToken;
    }

    return false;
  },
};

export default authServices;
