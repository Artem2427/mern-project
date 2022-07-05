declare interface AuthServices {
  registrationNewUser: (body: LoginIfno) => Promise<{ message: string }>;
  getAccessKey: () => string | null;
  checkUser: (body: LoginIfno) => Promise<UserInfo>;
  isLoggedIn: () => boolean;
  logout: () => void;
}

declare interface LoginIfno {
  email: string;
  password: string;
}

declare interface UserInfo {
  token: string;
  userId: string;
}
