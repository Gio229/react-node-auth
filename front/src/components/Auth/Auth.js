import React, { useState, useEffect, useContext } from "react";

import axios from "../../api/axios";

import AuthContext from '../../store/auth-context';

import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./Auth.module.css";

const SIGNIN_URL = "/api/login";
const SIGNUP_URL = "/api/create";

const Auth = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const authCtx  = useContext(AuthContext);

  const [username, setUsername] = useState({ val: "", isValid: undefined });
  const [password, setPassword] = useState({ val: "", isValid: undefined });

  const userNameHandler = (e) => {
    setUsername({
      val: e.target.value,
      isValid: e.target.value.trim().length > 3,
    });
  };

  const passwordHandler = (e) => {
    setPassword({
      val: e.target.value,
      isValid: e.target.value.trim().length > 6,
    });
  };
  const { isValid: usernameIsValid } = username;
  const { isValid: passwordIsValid } = password;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(usernameIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [usernameIsValid, passwordIsValid]);

  const toSignIn = () => {
    setSignIn(true);
    setErrMsg("");
    setUsername({ val: "", isValid: false });
    setPassword({ val: "", isValid: false });
  };

  const toSignUp = () => {
    setSignIn(false);
    setErrMsg("");
    setUsername({ val: "", isValid: false });
    setPassword({ val: "", isValid: false });
  };

  const formHandler = async (e) => {
    e.preventDefault();

    if (formIsValid && signIn) {
      //verify
      try {
        const response = await axios.post(SIGNIN_URL, {
          username: username.val,
          userPassword: password.val,
        });
        if (response.data.message) {
          setErrMsg(response.data.message);
        }

        //send to login
        authCtx.login(response.data);
      }catch(err) {
        console.log(err);
      }
    } else if (formIsValid && signIn === false) {
      //create account
      console.log("creating account");
      try {
        const response = await axios.post(SIGNUP_URL, {
          username: username.val,
          userPassword: password.val,
        });
        if (response.data.status) {
          setSignIn(true);
        }
        if (response.data.message) {
          setErrMsg(response.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }

    setUsername({ val: "", isValid: false });
    setPassword({ val: "", isValid: false });
  };

  return (
    <form onSubmit={formHandler} className={classes.auth}>
      {signIn ? <h1>Sign in</h1> : <h1>Sign up</h1>}
      <Input
        onChange={userNameHandler}
        value={username.val}
        id="username"
        type="text"
        placeholder="Username"
      />
      <Input
        onChange={passwordHandler}
        value={password.val}
        id="password"
        type="password"
        placeholder="Password"
      />
      <p className={classes["err-message"]}>{errMsg}</p>
      <Button
        type="submit"
        className="button-blackBlue"
        size="s100"
        disabled={!formIsValid}
      >
        {signIn ? "Sign in" : "Sign up"}
      </Button>
      {signIn ? (
        <span onClick={toSignUp}>Create Account ?</span>
      ) : (
        <span onClick={toSignIn}>Sign in</span>
      )}
    </form>
  );
};

export default Auth;
