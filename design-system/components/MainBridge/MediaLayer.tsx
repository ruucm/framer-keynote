import * as React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../../base";
import { SharePropsWithChildren } from "../../../base/utils/SharePropsWithChildren";
import * as System from "../../../design-system";
import { useProgressiveImage } from "./useProgressiveImage";

// const Wrap = styled(motion.div)``;

export function MediaLayer({ theme, type, fileName, currentPage }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];

  console.log("fileName - MediaLayer", fileName);
  const [mainLoaded, currentSrc] = useProgressiveImage({
    src: "/assets/images/" + fileName,
    fallbackSrc: "/assets/images/minimized/" + fileName,
    fileType: "image"
  });

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      {(() => {
        switch (type) {
          case "image":
            return (
              <div
                style={{
                  background:
                    "center / cover no-repeat url(" + currentSrc + ")",
                  // background:
                  //   "center / cover no-repeat url('/assets/images/" + fileName,
                  backgroundColor: selectedTheme.color.secondary,
                  height: "100%",
                  position: "relative"
                }}
              />
            );
          case "video":
            return <div>video</div>;
          default:
            return "Add Vaild Type";
        }
      })()}
    </SharePropsWithChildren>
  );
}
MediaLayer.defaultProps = {
  theme: "light"
};
