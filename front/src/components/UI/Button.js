import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
    const buttonClass = `${classes.button} ${classes[props.className]} ${classes[props.size]}`
  return (
    <button
      className={buttonClass}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
