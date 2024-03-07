import * as React from "react";
const SvgMic = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#mic_svg__a)">
      <path
        stroke="#fff"
        d="M7.5 14c1.218 4.417 7.41 4.612 8.903.28L16.5 14M14 13V9a2 2 0 1 0-4 0v4a2 2 0 1 0 4 0Z"
      />
    </g>
    <defs>
      <clipPath id="mic_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgMic;
