import * as React from "react";
const SvgInfo = ({color="white", ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={12} r={6.5} stroke={color} />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M11.5 12.5v-3h1v3zm0 2v-1h1v1z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgInfo;
