import * as React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../../base";
import { SharePropsWithChildren } from "../../../base/utils/SharePropsWithChildren";
import * as System from "../../../design-system";

const Wrap = styled(motion.div)``;

export function MainBridge({ theme, title, expanded, children }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap>MainBridge</Wrap>
    </SharePropsWithChildren>
  );
}
MainBridge.defaultProps = {
  theme: "light"
};