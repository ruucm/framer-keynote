import * as React from "react";

export function Plus({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
      <path
        d="M 6.3 13.3 L 6.3 7.8 L 0.9 7.8 C 0.5 7.8 0.2 7.4 0.2 7 C 0.2 6.6 0.5 6.3 0.9 6.3 L 6.3 6.3 L 6.3 0.7 C 6.3 0.3 6.6 0 7 0 C 7.4 0 7.7 0.3 7.7 0.7 L 7.7 6.2 L 13.1 6.2 C 13.5 6.2 13.8 6.5 13.8 6.9 C 13.8 7.3 13.5 7.6 13.1 7.6 L 7.7 7.6 L 7.7 13.1 C 7.7 13.7 7.4 14 7 14 C 6.6 14 6.3 13.7 6.3 13.3 Z"
        fill={color}
      ></path>
    </svg>
  );
}

Plus.defaultProps = {
  width: 24,
  height: 24,
  color: "rgb(152,152,157)"
};
