import * as React from "react";
const SvgDelete = ({color="white", ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke={color} d="m9.5 17.5-2-8h9l-2 8zM9.5 6.5h5" />
  </svg>
);
export default SvgDelete;
