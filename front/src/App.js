import React, {useContext} from "react";

import AuthContext from "./store/auth-context";

import Auth from './components/Auth/Auth'
import Home from "./components/home/Home";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      {authCtx.isLoggedIn === true && <Home />}
      {authCtx.isLoggedIn === false && <Auth />}
    </React.Fragment>
  );
}

export default App;
