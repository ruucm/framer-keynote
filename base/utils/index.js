import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const isClient = typeof window !== "undefined";

export const localStorageSevice = (key, initialValue) => {
  let storedValue = null;

  try {
    // Get from local storage by key
    const item = isClient && window.localStorage.getItem(key);
    // Parse stored json or if none return initialValue
    storedValue = item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // If error also return initialValue
    console.log(error);
    storedValue = initialValue;
  }

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save to local storage
      isClient &&
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export function grabColor(colorString) {
  const matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
  return matchColors.exec(colorString);
}

export function hexToRgbA(hex, alpha) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      ", " +
      alpha +
      ")"
    );
  }
  throw new Error("Bad Hex");
}

export const rgbToHex = rgb => {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) hex = "0" + hex;
  return hex;
};

export const fullColorHex = (r, g, b) => {
  const red = rgbToHex(r);
  const green = rgbToHex(g);
  const blue = rgbToHex(b);
  return "#" + red + green + blue;
};

export const rgbToRgba = (rgb, opacity) => {
  const color = grabColor(rgb)[0];
  return color.replace(")", ", " + opacity + ")").replace("rgb", "rgba");
};

export const sleep = sec =>
  new Promise(resolve => setTimeout(resolve, sec * 1000));

export const isEmpty = emptyArray =>
  !(
    typeof emptyArray !== "undefined" &&
    emptyArray != null &&
    emptyArray.length != null &&
    emptyArray.length > 0
  );

export const Center = styled.div`
  position: absolute;
  ${props =>
    props.center === "x" &&
    css`
      left: 50%;
      transform: translateX(-50%);
    `}
    ${props =>
      props.center === "y" &&
      css`
        top: 50%;
        transform: translateY(-50%);
      `}
    ${props =>
      props.center &&
      css`
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      `}
`;

export const getCurrentPlayBack = time => {
  const ct = Math.round(time);
  const min = parseInt(ct / 60);
  let sec = ct % 60;
  if (sec < 10) sec = "0" + sec;
  return min + ":" + sec;
};

export const wem = pxSize => {
  const baseScreenSize = 1920;
  return (pxSize / baseScreenSize) * 100;
};
