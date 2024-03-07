import * as React from "react";
const SvgHide = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <g clipPath="url(#hide_svg__a)">
      <path
        stroke="#fff"
        d="M16.656 9.828 14.95 10.94m-5.121 3.333V17m0-2.728 1.707-1.111m-1.707 1.111-1.707-1.111M3 9.828l1.707 1.111m1.707 1.111L5 14.5m1.414-2.45-1.707-1.111m1.707 1.111 1.707 1.111m5.121-1.111L14.5 14.5m-1.258-2.45 1.707-1.111m-1.707 1.111-1.707 1.111m-6.828-2.222L2.646 13m12.303-2.061L17.01 13m-5.475.161L12.5 16m-4.379-2.839L7.5 16"
      />
    </g>
    <defs>
      <clipPath id="hide_svg__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgHide;
