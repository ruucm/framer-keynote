import * as React from "react";
import { Override, Data } from "framer";

// Learn more: https://framer.com/docs/overrides/

const appState = Data({
  currentPercentage: 0
});

export function Lottie0(props): Override {
  return {
    percentage: appState.currentPercentage
  };
}

export function Slider(props): Override {
  return {
    onValueChange: value => {
      appState.currentPercentage = value;
    }
  };
}
