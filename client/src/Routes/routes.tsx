import AuthPage from "../Pages/AuthPage";
import CreatePage from "../Pages/CreatePage";
import DetailPage from "../Pages/DetailPage";
import HomePage from "../Pages/HomePage";
import LinksPage from "../Pages/LinksPage";
import NotFound from "../Pages/NotFound";

export const ROUTES: IRoute[] = [
  {
    path: "/",
    element: <HomePage />,
    private: false,
  },

  {
    path: "/login",
    element: <AuthPage />,
    private: false,
  },

  {
    path: "/links",
    element: <LinksPage />,
    private: true,
    childen: [],
  },

  {
    path: "/detail/:id",
    element: <DetailPage />,
    private: true,
  },

  {
    path: "/create-link",
    element: <CreatePage />,
    private: true,
  },

  { path: "*", element: <NotFound />, private: false },
];
