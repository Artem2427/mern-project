declare interface IconProps {
  color?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

declare interface AuthenticationContext {
  token: null | string;
  userId: null | string;
  login: (jwtToken: string, id: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
