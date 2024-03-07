import * as React from "react";
const SvgWarning = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#FF3535"
      fillRule="evenodd"
      d="M4.619 12.427h6.762A1.953 1.953 0 0 0 13.07 9.5l-3.38-5.856a1.952 1.952 0 0 0-3.382 0L2.93 9.499a1.952 1.952 0 0 0 1.69 2.928m4.034-4.739a.658.658 0 1 1-1.316 0V6.372a.658.658 0 1 1 1.316 0v1.316m-.658 2.632a.658.658 0 1 1 0-1.316.658.658 0 0 1 0 1.316"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgWarning;
