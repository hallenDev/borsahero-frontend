import * as React from "react";
const SvgUser = ({color="white", ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke={color} d="m6.5 14.033 5-2.475 5 2.475V17.5h-10v-3.467Z" />
    <circle cx={11.5} cy={8.5} r={3} stroke={color} />
  </svg>
);
export default SvgUser;
