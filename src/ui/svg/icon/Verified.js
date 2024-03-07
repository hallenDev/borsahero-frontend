import * as React from "react";
const SvgVerified = ({color="#946EFF", ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M13.881 6.21 12 4l-1.881 2.21-2.821-.682-.223 2.894-2.683 1.106L5.912 12l-1.52 2.472 2.683 1.106.223 2.894 2.82-.682L12 20l1.881-2.21 2.821.682.223-2.894 2.683-1.106L18.088 12l1.52-2.472-2.683-1.106-.223-2.894-2.82.682m-4.71 4.715-1.342 1.483 3.25 2.94 5.092-4.607-1.342-1.483-3.75 3.393-1.908-1.726"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgVerified;
