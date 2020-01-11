import * as React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import styled, { css, ThemeContext } from "styled-components";
import { themes } from "../../../base";
import { addPropertyControls, ControlType } from "framer";

export function RevealContainer({ theme, children, active }) {
  const selectedTheme = useContext(ThemeContext) || themes[theme];
  return (
    <motion.div
      style={{
        width: "100%",
        height: "100%",
        color: "red"
      }}
      animate={{
        y: active ? -808 - 34 : 0
        // y: active ? 'calc(-100% - 34px)' : 0,
      }}
      transition={selectedTheme.transitions.short}
    >
      {children}
    </motion.div>
  );
}

RevealContainer.defaultProps = {
  width: 414,
  height: 896,
  theme: "light",
  active: false
};

addPropertyControls(RevealContainer, {
  active: {
    type: ControlType.Boolean
  },
  children: {
    type: ControlType.ComponentInstance
  }
});
