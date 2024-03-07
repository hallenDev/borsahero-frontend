import * as React from "react";
const SvgSee = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="#fff"
      d="m10.1 4.965-.272-.177-.273.177L2.727 9.41l-.644.419.644.42 6.828 4.443.273.177.273-.177 6.828-4.444.644-.419-.644-.419L10.1 4.965Z"
    />
    <circle
      cx={10}
      cy={9.742}
      r={1}
      fill="#fff"
      transform="rotate(45 10 9.742)"
    />
  </svg>
);
export default SvgSee;
