// @flow
import * as React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../base";
import { SharePropsWithChildren } from "../../base/utils/SharePropsWithChildren";

const Wrap = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

export function Tray({ content, theme, reveal }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap>Tray</Wrap>
    </SharePropsWithChildren>
  );
}
Tray.defaultProps = {
  theme: "light"
};
