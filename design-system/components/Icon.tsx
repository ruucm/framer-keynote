import * as React from "react";
import styled, { css } from "styled-components";
import { Chevron } from "../../design-system/assets";

const Wrap = styled.div`
  ${props =>
    props.width &&
    css`
      width: ${props.width}px;
    `}
  ${props =>
    props.height &&
    css`
      height: ${props.height}px;
    `}
`;
const Rotate180 = styled.div`
  transform: rotate(180deg);
  width: 100%;
  height: 100%;
`;

export function Icon({ icon, color, width, height, ...props }) {
  return (
    <Wrap width={width} height={height}>
      {(() => {
        switch (icon) {
          case "ChevronRight":
            return <Chevron color={color} />;
          case "ChevronLeft":
            return (
              <Rotate180>
                <Chevron color={color} />
              </Rotate180>
            );
          default:
            return "Add Vaild Icon Property";
        }
      })()}
    </Wrap>
  );
}

Icon.defaultProps = {
  icon: "ChevronRight",
  color: "#000"
};
