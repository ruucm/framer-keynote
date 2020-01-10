import * as React from "react";
import * as System from "../../../design-system";
import styled, { css, ThemeContext } from "styled-components";

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background: pink;
  position: relative;
`;

export function MainBridge2({ theme, mediaLayer, width, height, contentData }) {
  return <System.MainBridge contentData={contentData} />;
}
MainBridge2.defaultProps = {
  theme: "light"
};
