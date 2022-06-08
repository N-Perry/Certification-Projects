import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Users from "./user/pages/Users.js";
import NewPlace from "./places/pages/NewPlace.js";
import UserPlaces from "./places/pages/UserPlaces.js";
import UpdatePlace from "./places/pages/UpdatePlace.js";
import Authenticate from "./user/pages/Authenticate.js";
import MainNavigation from "./shared/components/Navigation/MainNavigation.js";
import { AuthContext } from "./shared/context/auth-context.js";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token) => {
    setToken(token);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token }) // global JS browser API to access local storage
    ); 
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);  

  let routes;

  if (token) {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Authenticate />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>{routes}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
