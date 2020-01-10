// @flow
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../base";
import { sleep } from "../../base/utils";
import { SharePropsWithChildren } from "../../base/utils/SharePropsWithChildren";
import * as System from "../../design-system";

const Wrap = styled(motion.div)`
  border-top: 1px solid ${props => props.selectedTheme.color.border};
  border-bottom: 1px solid ${props => props.selectedTheme.color.border};
  cursor: pointer;
  padding-top: 15.8px;
  padding-bottom: 15.8px;
`;
const Icon = styled(motion.div)`
  width: 17.5px;
  height: 17.5px;
  position: absolute;
  top: 15.8px;
  right: 0;
`;
const Content = styled(motion.div)`
  position: absolute;
  top: 52px;
`;

const initialHeight = 52;
export function Tray({ theme, title, expanded, children }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];
  let expandedHeight = 300;
  if (children && children.length)
    expandedHeight = children[0].props.height + initialHeight + 15.8;

  const [expandedState, setExpandedState] = useState(false);
  useEffect(() => setExpandedState(false), [title])

  const wrapAnim = useAnimation();
  const iconAnim = useAnimation();
  const contentAnim = useAnimation();
  useEffect(() => {
    const expand = async () => {
      wrapAnim.start({
        height: expandedHeight
      });
      await iconAnim.start({
        rotate: 45
      });
      contentAnim.start({
        opacity: 1
      });
    };
    const unexpand = async () => {
       contentAnim.start({
        opacity: 0,
        transition: {
          duration: 0
        }
      });
      wrapAnim.start({
        height: initialHeight,
        transition: {
          duration: 0
        }
      });
      iconAnim.start({
        rotate: 0,
        transition: {
          duration: 0
        }
      });
    };
    if (expandedState) expand();
    else unexpand();
  }, [expandedState]);

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap
        animate={wrapAnim}
        transition={selectedTheme.transitions.long}
        onClick={() => setExpandedState(!expandedState)}
      >
        <System.Typography text={title} type="ButtonText" />
        <Icon animate={iconAnim} transition={selectedTheme.transitions.long}>
          <System.Icon icon="Plus" color={selectedTheme.color.secondary} />
        </Icon>
        <Content
          initial={{
            opacity: 0
          }}
          animate={contentAnim}
          transition={selectedTheme.transitions.long}
        >
          {children ? children : "Add Children"}
        </Content>
      </Wrap>
    </SharePropsWithChildren>
  );
}
Tray.defaultProps = {
  theme: "light",
  title: "Explore new artists and genress",
  expanded: false
};
