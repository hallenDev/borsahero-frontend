import * as React from "react";
const SvgMedia = ({color="white", ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke={color} d="M4.5 6.5h15v11h-15z" />
    <path fill={color} d="m13.5 12-2.25 1.299v-2.598z" />
  </svg>
);
export default SvgMedia;
