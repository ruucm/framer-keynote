import * as React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../base";
import { SharePropsWithChildren } from "../../base/utils/SharePropsWithChildren";
import * as System from "../../design-system";

const Wrap = styled(motion.div)``;

export function TrayContent({ theme, text }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap>
        <System.Typography type="Paragraph" text={text} />
      </Wrap>
    </SharePropsWithChildren>
  );
}
TrayContent.defaultProps = {
  theme: "light",
  text:
    "Labore quis amet exercitation elit dolor anim fugiat sunt duis aute non. Proident sit aliqua deserunt velit laboris. Ex mollit cupidatat consequat culpa in id duis nisi Lorem ut laboris."
};
