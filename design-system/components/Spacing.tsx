import * as React from "react";
import styled, { css } from "styled-components";

export function Spacing({ height, width, type, show, mobileHeight, ...props }) {
  const Wrap = styled.div`
    background: ${show ? "skyblue" : ""};
    height: ${height}px;
    width: ${width}px;
    @media (max-width: 1080px) {
      height: ${mobileHeight}px;
    }
    ${props =>
      props.type === "h" &&
      css`
        display: inline-block;
        height: initial;
      `}
  `;
  return <Wrap type={type} />;
}

Spacing.defaultProps = {
  height: 30,
  width: 30,
  type: "v", // h(horizontal), v(vertical)
  show: false
};
