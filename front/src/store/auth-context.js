import React, { useState, useCallback, useEffect } from "react";

import axios from "../api/axios";

const AuthContext = React.createContext({
  username: "",
  token: "",
  isLoggedIn: false,
  login: (dataLogin) => {},
  logout: () => {}
});

const VERIFY_AUTH_URL = "/api/isUserAuth";

export const AuthContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    token: "",
    auth: undefined,
  });

  const fetchingAuth = async () => {
    try {
      const response = await axios.get(VERIFY_AUTH_URL, {
        headers: { "x-access-token": localStorage.getItem("token") },
      });
      if (response.data.user) {
        setUserInfo({
          username: response.data.user[0].username,
          token: localStorage.getItem("token"),
          auth: response.data.auth,
        });
      } else {
        //console.log("Authentification failed");
        setUserInfo({
          username: "",
          token: "",
          auth: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
      fetchingAuth();
  }, []);

  const logoutHandler = useCallback(() => {
    setUserInfo((prevState) => {
      return { ...prevState, token: null, auth: false };
    });
    localStorage.removeItem("token");
  }, []);

  const loginHandler = (dataLogin) => {
    if (dataLogin) {
      setUserInfo({
        username: dataLogin.user[0].username,
        token: dataLogin.token,
        auth: dataLogin.auth,
      });
      localStorage.setItem("token", dataLogin.token);
    }
  };

  //-----------------------------------

  const contextValue = {
    username: userInfo.username,
    pwd: userInfo.pwd,
    token: userInfo.token,
    isLoggedIn: userInfo.auth,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
