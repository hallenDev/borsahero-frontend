import * as React from "react";
const SvgHeart = ({color="white", ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={color}
      d="m16.128 6-4.043 4.043L8.043 6 4 10.043l8.085 8.085 8.086-8.085z"
    />
  </svg>
);
export default SvgHeart;
