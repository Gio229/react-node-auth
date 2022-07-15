import React, { useContext } from "react";

import AuthContext from "../../store/auth-context";

import wlcm from "../../assets/samurai.png";
import me from "../../assets/wlcm.svg";
import Button from "../UI/Button";
import classes from "./Home.module.css";

const Home = () => {
  const authCtx = useContext(AuthContext);

  const logout = () => {
    authCtx.logout();
  };

  return (
    <React.Fragment>
      <div className={classes.home}>
        <img src={wlcm} alt="welcome" />
        <div className={classes.wlcm}>
          <h1>{`Welcome to you ${authCtx.username}`}</h1>
          <Button onClick={logout} className="button-blackBlue" size="s20">
            Logout
          </Button>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.container}>
          <img className={classes.me} src={me} alt="me" />
          My name is <span>Giovanni ATCHAOUE</span>. I'm a{" "}
          <span>web developper</span> and I hope you are spending a good time. I
          make this little app with <span>React</span> and the
          <span> javascript</span> runtime environement <span>Node.js</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
