import * as React from "react";
const SvgSmile = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={12} r={7.5} stroke="#fff" />
    <path stroke="#fff" d="M8.569 12.69a3.5 3.5 0 0 0 6.84.101" />
    <path fill="#fff" d="M9 9h2v2H9zM13 9h2v2h-2z" />
  </svg>
);
export default SvgSmile;
