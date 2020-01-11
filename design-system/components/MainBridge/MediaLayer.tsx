import * as React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../../base";
import { isClient } from "../../../base/utils";
import { SharePropsWithChildren } from "../../../base/utils/SharePropsWithChildren";
import * as System from "../../../design-system";

const Video = styled.video`
  width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const baseUrl = isClient && window.location.href.replace("/preview", "");
export function MediaLayer({ theme, type, fileName, framerLayer }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];
  console.log("fileName - MediaLayer", fileName);
  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      {(() => {
        switch (type) {
          case "image":
            return (
              <div
                style={{
                  background:
                    "center / cover no-repeat url('" +
                    baseUrl +
                    "assets/images/" +
                    fileName,
                  backgroundColor: selectedTheme.color.secondary,
                  height: "100%",
                  position: "relative"
                }}
              />
            );
          case "video":
            return (
              <Video autoPlay>
                <source
                  src={baseUrl + "assets/videos/" + fileName}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </Video>
            );
          case "framerLayer":
            return (
              <div
                style={{
                  width: "100%",
                  height: "100%"
                }}
              >
                {framerLayer[Number(fileName)]
                  ? React.cloneElement(framerLayer[Number(fileName)], {
                      width: "100%",
                      height: "100%"
                    })
                  : "Add FramerLayer First"}
              </div>
            );
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
