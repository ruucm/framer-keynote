// @flow
import * as React from "react";
import { useContext, useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../base";
import { sleep } from "../../base/utils";
import { SharePropsWithChildren } from "../../base/utils/SharePropsWithChildren";
import * as System from "../../design-system";
import { useKeyPress } from "./use-keypress";

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
let expandedHeight = 300;
export function Tray({ theme, title, expanded, children }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];

  const [expandedState, setExpandedState] = useState(false);
  useEffect(() => setExpandedState(false), [title]);
  const ArrowDownPress = useKeyPress("ArrowDown");
  const ArrowUpPress = useKeyPress("ArrowUp");

  useEffect(() => {
    if (ArrowDownPress) setExpandedState(true);
  }, [ArrowDownPress]);
  useEffect(() => {
    if (ArrowUpPress) setExpandedState(false);
  }, [ArrowUpPress]);

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

  const observed = useRef(null);

  if (children && children.length && children[0].props.height)
    expandedHeight = children[0].props.height + initialHeight + 15.8; // for framer layer
  useEffect(() => {
    let height = observed.current.clientHeight;
    expandedHeight = height + initialHeight + 15.8;
  }, [observed, title]);

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
          <div ref={observed}>{children ? children : "Add Children"}</div>
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
