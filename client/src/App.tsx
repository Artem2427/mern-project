import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./Store";

import PrivateRoute from "./Routes/private";
import { ROUTES } from "./Routes/routes";
import { useAuth } from "./Hooks/auth.hook";
import { AuthContext } from "./Context/AuthContext";

import NavBar from "./Components/NavBar";
import Loader from "./Components/Loader";

import loaderStyles from "./Utils/Styles/loaderStyle";
import useStyles from "./style";

const App = () => {
  const classes = useStyles();
  const spin = loaderStyles();
  const setupStore = store();
  const { token, login, logout, userId, ready } = useAuth();

  const isAuthenticated = !!token;

  if (!ready) {
    return <Loader clazz={spin.loader} />;
  }

  return (
    <Provider store={setupStore}>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          userId,
          isAuthenticated,
        }}
      >
        <div className={classes.root}>
          <BrowserRouter>
            {isAuthenticated && <NavBar />}
            <Routes>
              {ROUTES.map((route, index) => {
                if (route.private) {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <PrivateRoute
                          component={route.element}
                          isAuthenticated={isAuthenticated}
                        />
                      }
                    />
                  );
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
            </Routes>
          </BrowserRouter>
        </div>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
