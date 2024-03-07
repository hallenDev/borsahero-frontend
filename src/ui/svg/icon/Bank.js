import * as React from "react";
const SvgBank = ({color="white", ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill={color}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M7 21H3V10h4zm7-11h-4v11h4zm7 0h-4v11h4zm2 12H1v2h22zM0 9h24L12 0z" />
  </svg>
);
export default SvgBank;
