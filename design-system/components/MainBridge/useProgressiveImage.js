import { useEffect, useReducer, useState } from "react";

function reducer(currentSrc, action) {
  if (action.type === "main image loaded") {
    return action.src;
  }
  if (!currentSrc) {
    return action.src;
  }
  return currentSrc;
}

export function useProgressiveImage({ src, fallbackSrc }) {
  const [currentSrc, dispatch] = useReducer(reducer);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const mainImage = new Image();
    const fallbackImage = new Image();

    mainImage.onload = () => {
      dispatch({ type: "main image loaded", src });
    };
    fallbackImage.onload = () => {
      dispatch({ type: "fallback image loaded", src: fallbackSrc });
    };

    mainImage.src = src;
    fallbackImage.src = fallbackSrc;
  }, [src, fallbackSrc]);

  return currentSrc;
}
