import * as React from "react";

export function OutLink({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        d="M 32 24.2 C 31.9 25.5 31 26.4 29.9 26.4 C 28.8 26.4 27.8 25.4 27.8 24.3 L 27.8 16.9 L 28.2 6.2 L 24.5 10.5 L 3.6 31.3 C 3.2 31.8 2.7 32 2.1 32 C 1 32 0 30.9 0 29.8 C 0 29.3 0.2 28.8 0.7 28.3 L 21.5 7.5 L 25.8 3.8 L 14.7 4.1 L 7.7 4.1 C 6.6 4.1 5.6 3.2 5.6 2.1 C 5.6 1 6.5 0.1 7.8 0 L 29.8 0 C 31.1 0 32 0.9 32 2.2 Z"
        fill={color}
      ></path>
    </svg>
  );
}
OutLink.defaultProps = {
  width: 24,
  height: 24,
  color: "rgb(0,112,201)"
};
