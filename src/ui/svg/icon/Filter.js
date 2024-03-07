import * as React from "react";
const SvgFilter = ({color='white', ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke={color} d="M12.237 13 7.474 6.75H17L12.237 13Zm0 0v5" />
  </svg>
);
export default SvgFilter;
