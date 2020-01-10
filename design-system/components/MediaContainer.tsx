// @flow
import * as React from "react";
import { useContext, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../base";
import { SharePropsWithChildren } from "../../base/utils/SharePropsWithChildren";

const Wrap = styled(motion.div)`
  width: 100%;
  height: 100%;
  box-shadow: 10px 20px 30px 10px
    ${props => props.selectedTheme.color.secondary};
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

export function MediaContainer({ content, theme, reveal, from }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];
  const anim = useAnimation();

  useEffect(() => {
    const fadeLeft = async () => {
      anim.start({
        x: "-100%",
        opacity: 0
      });
    };
    const revealFromLeft = async () => {
      await anim.start({
        x: "-100%",
        opacity: 0,
        transition: {
          duration: 0
        }
      });
      anim.start({
        x: 0,
        opacity: 1
      });
    };
    const fadeRight = async () => {
      anim.start({
        x: "100%",
        opacity: 0
      });
    };
    const revealFromRight = async () => {
      await anim.start({
        x: "100%",
        opacity: 0,
        transition: {
          duration: 0
        }
      });
      anim.start({
        x: 0,
        opacity: 1
      });
    };

    if (reveal) {
      if (from === "right") revealFromRight();
      else if (from === "left") revealFromLeft();
    } else {
      if (from === "right") fadeRight();
      else if (from === "left") fadeLeft();
    }
  }, [reveal]);

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap animate={anim} transition={selectedTheme.transitions.long}>
        {content && content.length ? content : "add Content"}
      </Wrap>
    </SharePropsWithChildren>
  );
}
MediaContainer.defaultProps = {
  content: null,
  theme: "light",
  reveal: true,
  from: "right"
};
