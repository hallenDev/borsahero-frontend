import * as React from "react";
const SvgCheck = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path stroke={props.color} d="M4 7.5 7.5 11l6-6" />
  </svg>
);
export default SvgCheck;
