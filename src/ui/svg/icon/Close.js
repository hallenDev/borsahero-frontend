import * as React from "react";
const SvgClose = ({color="white", ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke={color} d="m7 7 10 10M7 17 17 7" />
  </svg>
);
export default SvgClose;
