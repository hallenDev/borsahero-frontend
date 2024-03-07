import * as React from "react";
const SvgUpload = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke={props.color} d="M12 15V6m0 0-4 4m4-4 4 4M6 18h12" />
  </svg>
);
export default SvgUpload;
