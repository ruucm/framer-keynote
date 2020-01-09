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
  background: ${props => props.selectedTheme.color.background};
`;

export function MediaContainer({ content, theme, reveal }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap
        initial={{
          x: "100%"
        }}
        animate={{
          opacity: reveal ? 1 : 0,
          x: reveal ? 0 : "-100%"
        }}
      >
        {content.length ? content : "add Content"}
      </Wrap>
    </SharePropsWithChildren>
  );
}
MediaContainer.defaultProps = {
  content: null,
  theme: "light",
  reveal: true
};
