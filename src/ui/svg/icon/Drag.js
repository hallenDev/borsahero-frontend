import * as React from "react";
const SvgDrag = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#fff"
      d="M8 6h2v2H8zM14 6h2v2h-2zM8 11h2v2H8zM14 11h2v2h-2zM8 16h2v2H8zM14 16h2v2h-2z"
    />
  </svg>
);
export default SvgDrag;
