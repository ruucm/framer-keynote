// @flow
import * as React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../base";
import { SharePropsWithChildren } from "../../base/utils/SharePropsWithChildren";
import * as System from "../../design-system";

const Wrap = styled(motion.div)`
  border-top: 1px solid ${props => props.selectedTheme.color.border};
  border-bottom: 1px solid ${props => props.selectedTheme.color.border};
  cursor: pointer;
  padding-top: 1.058em;
  padding-bottom: calc(1.058em + 1px);
  background: pink;
`;
const Icon = styled(motion.div)`
  width: 17.5px;
  height: 17.5px;
  position: absolute;
  top: 1.058em;
  right: 0;
`;

export function Tray({ theme, title, expanded }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap
        animate={{
          height: expanded ? 300 : 52
        }}
      >
        <System.Typography text={title} type="ButtonText" />
        <Icon
          animate={{
            rotate: expanded ? 90 : 0
          }}
        >
          <System.Icon icon="Plus" />
        </Icon>
      </Wrap>
    </SharePropsWithChildren>
  );
}
Tray.defaultProps = {
  theme: "light",
  title: "Explore new artists and genress",
  expanded: true
};
