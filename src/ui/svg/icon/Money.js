import * as React from "react";
const SvgMoney = ({color="white", ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={color}
      strokeWidth={1.011}
      d="M3.505 6.505h17.181v11.117H3.505zM6.537 9.032v6.064M17.655 9.032v6.064"
    />
    <circle
      cx={12.096}
      cy={12.064}
      r={1.516}
      stroke={color}
      strokeWidth={1.011}
    />
  </svg>
);
export default SvgMoney;
