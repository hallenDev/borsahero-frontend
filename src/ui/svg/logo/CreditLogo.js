import * as React from "react";
const SvgCreditLogo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 49 48"
    {...props}
  >
    <g clipPath="url(#creditLogo_svg__a)">
      <circle cx={15.5} cy={23.941} r={15} fill="#EB001B" />
      <circle cx={33.5} cy={23.941} r={15} fill="#F79E1B" />
      <path
        fill="#FF5F00"
        fillRule="evenodd"
        d="M24.5 35.941c4.14-2.395 6.927-6.872 6.927-12 0-5.127-2.786-9.604-6.927-12-4.14 2.396-6.927 6.873-6.927 12 0 5.128 2.786 9.605 6.927 12"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="creditLogo_svg__a">
        <path fill="#fff" d="M.5 0h48v48H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCreditLogo;
