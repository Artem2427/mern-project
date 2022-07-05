declare interface IRoute {
  path: string;
  element: ReactNode;
  childen?: IRoute[];
  private: boolean;
}
