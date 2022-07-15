import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
    const fieldClass = `${classes.field} ${classes[props.size]} ${
      classes[props.space_top_bottom]
    }`;
    return (
      <div className={fieldClass}>
        <label>{props.label}</label>
        <input
          id={props.id}
          value={props.value}
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          ref={ref}
        ></input>
      </div>
    );
  }
  );
export default Input;
