import * as React from "react";
const SvgStopCancel = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="#fff" d="m9 9 6 6m-6 0 6-6" />
    <circle cx={12} cy={12} r={7.5} stroke="#fff" />
  </svg>
);
export default SvgStopCancel;
