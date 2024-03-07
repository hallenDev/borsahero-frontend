import * as React from "react";
const SvgCam = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="#fff" d="M5.25 8h10v8h-10z" />
    <path
      fill="#fff"
      d="m15.375 11.35 1.125-.65 2.25-1.298v5.196l-2.25-1.3-1.125-.649v-1.298"
    />
  </svg>
);
export default SvgCam;
