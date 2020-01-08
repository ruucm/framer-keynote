import * as React from "react";

export function Chevron({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M 7.2 3.2 L 11.8 7.5 C 11.9 7.7 12 7.8 12 8 C 12 8.2 11.9 8.3 11.8 8.5 L 7.2 12.8 C 7.1 12.9 6.9 13 6.7 13 C 6.3 13 6 12.7 6 12.3 C 6 12.1 6.1 12 6.2 11.8 L 10.3 8 L 6.2 4.1 C 6.1 4 6 3.8 6 3.7 C 6 3.3 6.3 3 6.7 3 C 6.9 3 7.1 3.1 7.2 3.2 Z"
        fill={color}
      />
    </svg>
  );
}

Chevron.defaultProps = {
  width: 24,
  height: 24,
  color: "rgb(152,152,157)"
};
