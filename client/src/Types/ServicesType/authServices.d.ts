declare interface AuthServices {
  registrationNewUser: (body: LoginIfno) => Promise<{ message: string }>;
  getAccessKey: () => string | null;
  checkUser: (body: LoginIfno) => Promise<UserInfo>;
  logout: () => void;
  getAccessToken: () => Promise<{ token: string }>;
  isLoggedIn: () => boolean;
}

declare interface LoginIfno {
  email: string;
  password: string;
}

declare interface UserInfo {
  token: string;
  userId: string;
}
