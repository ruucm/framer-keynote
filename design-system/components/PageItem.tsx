import * as React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../base";
import { SharePropsWithChildren } from "../../base/utils/SharePropsWithChildren";
import * as System from "../../design-system";
import { Row, Column } from "ruucm-blocks/layouts";
import { Frame, Stack } from "framer";

const Wrap = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const StyledColumn = styled(Column)`
  position: relative;
  background: pink;
  padding: 0 110px;
`;
const Description = styled.div`
  background: skyblue;
  position: absolute;
  width: 470px;
  height: 500px;
  top: calc(50% - 44px);
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Media = styled.div`
  background: skyblue;
  position: absolute;
  width: 1178px;
  height: 803px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PageNumber = styled.div`
  background: red;
  height: 44px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export function PageItem({ theme, descLayer, mediaLayer, width, height }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap>
        <Row>
          <StyledColumn
            col={4}
            style={{
              width: width,
              height: height
            }}
          >
            <Description>{descLayer}</Description>
            <PageNumber>
              <System.PageNumber />
            </PageNumber>
          </StyledColumn>
          <Column
            col={8}
            style={{
              width: width,
              height: height
            }}
          >
            <Media>{mediaLayer}</Media>
          </Column>
        </Row>
      </Wrap>
    </SharePropsWithChildren>
  );
}
PageItem.defaultProps = {
  theme: "light"
};
