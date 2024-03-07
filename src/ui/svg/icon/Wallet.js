import * as React from "react";
const SvgWallet = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path stroke="#fff" d="M5.5 7.5h13v9h-13z" />
    <circle cx={15} cy={13} r={1} fill="#fff" />
  </svg>
);
export default SvgWallet;
