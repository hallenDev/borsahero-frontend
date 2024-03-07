import * as React from "react";
const SvgLive = ({color="white", ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke={color} d="m8 16-4-4 4-4" />
    <circle cx={12} cy={12} r={2} fill={color} />
    <path stroke={color} d="m16 8 4 4-4 4" />
  </svg>
);
export default SvgLive;
