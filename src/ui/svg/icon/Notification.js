import * as React from "react";
const SvgNotification = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="#fff" d="m6.5 9.535 5.5-3.92 5.5 3.92V15.5h-11V9.535Z" />
    <circle cx={12} cy={18} r={1} fill="#fff" />
  </svg>
);
export default SvgNotification;
