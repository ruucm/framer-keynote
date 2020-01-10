import * as React from "react";

export function ChevronLeft({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M 8.8 3.2 L 4.2 7.5 C 4.1 7.7 4 7.8 4 8 C 4 8.2 4.1 8.3 4.2 8.5 L 8.8 12.8 C 8.9 12.9 9.1 13 9.3 13 C 9.7 13 10 12.7 10 12.3 C 10 12.1 9.9 12 9.8 11.8 L 5.7 8 L 9.8 4.1 C 9.9 4 10 3.8 10 3.7 C 10 3.3 9.7 3 9.3 3 C 9.1 3 8.9 3.1 8.8 3.2 Z"
        fill={color}
      ></path>
    </svg>
  );
}

ChevronLeft.defaultProps = {
  width: 24,
  height: 24,
  color: "rgb(152,152,157)"
};
