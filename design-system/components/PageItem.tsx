import * as React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../base";
import { SharePropsWithChildren } from "../../base/utils/SharePropsWithChildren";
import * as System from "../../design-system";
import { Row, Column } from "ruucm-blocks/layouts";

const Wrap = styled(motion.div)`
  background: pink;
`;

export function PageItem({ theme, descLayer, mediaLayer }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap>
        <Row>
          <Column col={4}>{descLayer}</Column>
          <Column col={8}>{mediaLayer}</Column>
        </Row>
      </Wrap>
    </SharePropsWithChildren>
  );
}
PageItem.defaultProps = {
  theme: "light"
};
