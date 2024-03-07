import * as React from "react";

const SvgSearch = props => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="1em"
  height="1em"
  fill="none"
  viewBox="0 0 18 18"
  {...props}
  >
    <path
      stroke={props.color}
      strokeLinecap="round"
      strokeWidth={2}
      d="m17 17-3.95-3.95M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
  </svg>
)

export default SvgSearch;