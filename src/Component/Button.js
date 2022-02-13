import React from "react";
import "./Button.css";

const Button = (props) => {
  //   const classes = "btn " + props.className;
  return (
    <button
      className="btn"
      type={"button" || props.type}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};

export default Button;
