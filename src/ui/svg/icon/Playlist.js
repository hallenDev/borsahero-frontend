import * as React from "react";
const SvgPlaylist = ({color="white", ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke={color} d="M5 6h13v9H5z" />
    <path fill={color} d="m13 10.5-2.25 1.299V9.201z" />
    <path stroke={color} d="M20 8v9H7" />
  </svg>
);
export default SvgPlaylist;
