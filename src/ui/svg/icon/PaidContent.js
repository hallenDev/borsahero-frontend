import * as React from "react";
const SvgPaidContent = ({color, ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={color}
      d="m12 5 1.89 5.11L19 12l-5.11 1.89L12 19l-1.89-5.11L5 12l5.11-1.89z"
    />
  </svg>
);
export default SvgPaidContent;
