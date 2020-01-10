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

export function useProgressiveImage({ src, fallbackSrc, fileType, hasMedia }) {
  const [currentSrc, dispatch] = useReducer(reducer);
  const [mainLoaded, setLoaded] = useState(false);
  useEffect(() => {
    if (fileType === "image" && hasMedia) {
      const mainImage = new Image();
      const fallbackImage = new Image();

      mainImage.onload = () => {
        dispatch({ type: "main image loaded", src });
        setLoaded(true);
      };
      fallbackImage.onload = () => {
        dispatch({ type: "fallback image loaded", src: fallbackSrc });
      };

      mainImage.src = src;
      fallbackImage.src = fallbackSrc;
    }
  }, [src, fallbackSrc]);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return [mainLoaded, currentSrc];
}
