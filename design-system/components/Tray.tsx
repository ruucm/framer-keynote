// @flow
import * as React from "react";
import { useContext, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../base";
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
  if (children.length)
    expandedHeight = children[0].props.height + initialHeight + 15.8;

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
      await contentAnim.start({
        opacity: 0
      });
      wrapAnim.start({
        height: initialHeight
      });
      iconAnim.start({
        rotate: 0
      });
    };
    if (expanded) expand();
    else unexpand();
  }, [expanded]);

  return (
    <SharePropsWithChildren selectedTheme={selectedTheme}>
      <Wrap animate={wrapAnim} transition={selectedTheme.transitions.short}>
        <System.Typography text={title} type="ButtonText" />
        <Icon animate={iconAnim} transition={selectedTheme.transitions.short}>
          <System.Icon icon="Plus" color={selectedTheme.color.secondary} />
        </Icon>
        <Content
          initial={{
            opacity: 0
          }}
          animate={contentAnim}
          transition={selectedTheme.transitions.short}
        >
          {children}
        </Content>
      </Wrap>
    </SharePropsWithChildren>
  );
}
Tray.defaultProps = {
  theme: "light",
  title: "Explore new artists and genress",
  expanded: true
};
