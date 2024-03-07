import * as React from "react";
const SvgSettings = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#fff"
      d="M5.5 8.29 12 4.576l6.5 3.714v7.42L12 19.424 5.5 15.71V8.29Z"
    />
    <circle cx={12} cy={12} r={1} fill="#fff" />
  </svg>
);
export default SvgSettings;
